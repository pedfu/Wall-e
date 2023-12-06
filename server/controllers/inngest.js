const Post = require("../mongodb/models/post");
const { Inngest } = require("inngest");

const inngest = new Inngest({ id: 'wall-e' })
module.exports.inngest = inngest
module.exports.generateImage = inngest.createFunction(
    { id: 'generate-image' },
    { event: 'ai/generate.image' },
    async ({ event, step }) => {
        console.log('dentro')
        try {
            const { prompt, user } = event.data

            // if ip or email already have 10 pictures generated this month, return error
            const combinedQuery = {
                $or: [
                  { email: user.email },
                  { ipAddress: user.ipAddress }
                ]
            };          
            const result = await User.find(combinedQuery);
            if (result.some(u => u.monthCount >= 10)) {
                return res.status(400).json({ message: 'You have reached the max count for this month' })
            }
    
            // request for ai art generator
            const response = await imagine.generations(
                `${prompt}`,
                {
                    style: GenerationStyle.IMAGINE_V5,
                }
            );
    
            const image = response.data().base64()
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
            
            // create post
            const post = new Post({
                description: '',
                image: `https://pedrofamouspersons-images.s3.amazonaws.com/ai-images/${imageId}`,
                createdBy: {
                    userId: user._id,
                    username: user.username
                },
                prompt,
                isPublic: false,
                likes: [],
                comments: []
            })
            
            user.monthCount = user.monthCount + 1
            await user.save()
            await post.save()
        } catch (err) {
            console.error(err)
        }
    }
)