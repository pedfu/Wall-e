const dotenv = require('dotenv')
const Post = require("../mongodb/models/post.js");
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const User = require("../mongodb/models/user.js");
const authenticate = require('../middlewares/auth.js')
const { client, GenerationStyle, Status } = require('imaginesdk')

dotenv.config()

const imagine = client(process.env.IMAGINEART_API_KEY);

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});
const s3 = new AWS.S3();

module.exports.generateImageWithImagineAI = async (prompt, userData, postId) => {
    try {
        // if ip or email already have 10 pictures generated this month, return error
        const combinedQuery = {
            $or: [
              { email: userData.email },
              { ipAddress: userData.ipAddress }
            ]
        };          
        const result = await User.find(combinedQuery);
        if (result.some(u => u.monthCount >= 10)) {
            return res.status(400).json({ message: 'You have reached the max count for this month' })
        }

        const user = await User.findOne({ _id: userData._id })

        //  request for ai art generator
        const response = await imagine.generations(
            `${prompt}`,
            {
                style: GenerationStyle.IMAGINE_V5,
            }
        );

        const image = response.data()?.base64()
        const imageId = uuidv4()

        // save image in aws
        const buffer = Buffer.from(image, 'base64')
        const params = {
            Bucket: 'pedrofamouspersons-images',
            Key: `ai-images/${imageId}`,
            Body: buffer,
            ContentType: 'image/png',
            ACL: 'public-read'
        }
        await s3.upload(params).promise()
        
        const post = await Post.findOne({ _id: postId })     
        if (buffer) {
            // create post
            console.log(`https://pedrofamouspersons-images.s3.amazonaws.com/ai-images/${imageId}`)
            post.image = `https://pedrofamouspersons-images.s3.amazonaws.com/ai-images/${imageId}`
            
            user.monthCount = user.monthCount + 1
            await user.save()
            await post.save()
        } else {
            await Post.deleteOne({ _id: post._id })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports.generateImageWithEdenAI = async (prompt, userData, postId) => {
    if (!prompt) return

    const user = await User.findOne({ _id: userData._id })
    const response = await fetch(process.env.EDEN_API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.EDEN_API_KEY}`
        },
        body: JSON.stringify({
            num_images: 1,
            providers: "stabilityai",
            resolution: "1024x1024",
            response_as_dict: false,
            settings: {},
            text: prompt
        })
    })

    const data = await response.json()
    const { status, items } = data[0]
    if (status === 'success') {
        console.log(data) 
        const image = items[0].image
        const imageId = uuidv4()

        // save image in aws
        const buffer = Buffer.from(image, 'base64')
        const params = {
            Bucket: 'pedrofamouspersons-images',
            Key: `ai-images/${imageId}`,
            Body: buffer,
            ContentType: 'image/png',
            ACL: 'public-read'
        }
        await s3.upload(params).promise()

        const post = await Post.findOne({ _id: postId })    
        // create post
        post.image = `https://pedrofamouspersons-images.s3.amazonaws.com/ai-images/${imageId}`
        
        user.monthCount = user.monthCount + 1
        await user.save()
        await post.save()
    } else {
        await Post.deleteOne({ _id: postId })        
    }
}