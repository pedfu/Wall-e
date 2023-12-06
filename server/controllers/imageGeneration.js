const dotenv = require('dotenv')
const Post = require("../mongodb/models/post.js");
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

dotenv.config()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});
const s3 = new AWS.S3();

export const generateImageWithEdenAI = async (prompt, user) => {
    if (!prompt) return

    const response = await fetch(process.env.EDEN_API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.EDEN_API_KEY}`
        },
        body: JSON.stringify({
            response_as_dict: false,
            attributes_as_list: false,
            show_original_response: false,
            settings: JSON.stringify({ stabilityai: "stable-diffusion-v1-6" }),
            resolution: "1024x1024",
            num_images: 1,
            providers: "stabilityai",
            text: "A boy with red hat"
        })
    })

    const data = await response.json()
    const { status, items } = data[0]
    if (status === 'success') {
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

        const post = new Post({
            description: '',
            image: `${process.env.AWS_BUCKET_URL}/${imageId}`,
            createdBy: {
                userId: user._id,
                username: user.username
            },
            prompt,
            isPublic: false,
            likes: [],
            comments: []
        })
        await post.save()

        return { success: true, post }
    }
    return { success: false, post: null }
}