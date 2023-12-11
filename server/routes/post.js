const express = require('express');
const dotenv = require('dotenv')
const Post = require('../mongodb/models/post.js');
const User = require('../mongodb/models/user.js');
const authenticate = require('../middlewares/auth.js')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
const { client, GenerationStyle, Status } = require('imaginesdk')
const { queue } = require('../queue.js')

dotenv.config()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});
const s3 = new AWS.S3();

const imagine = client(process.env.IMAGINEART_API_KEY);

const router = express.Router()

// get posts
router.route('/').get(authenticate, async (req, res) => {    
    await Post.find().then(posts => {
        res.status(200).send(posts)
    })
})

// get liked posts
router.route('/liked').get(authenticate, async (req, res) => {    
    await Post.find({ 'likes.userId': req.user._id.toString() }).then(posts => {
        res.status(200).send(posts)
    })
})

// get post
router.route('/:id').get(authenticate, async (req, res) => {
    const { id } = req.params
    await Post.findOne({ _id: id }).then(post => {
        res.status(200).send(post)
    })
})

// get comments from post
router.route('/:id/comments').get(authenticate, async (req, res) => {
    const { id } = req.params
    await Post.findOne({ _id: id }).then(post => {
        res.status(200).send(post.comments)
    })
})

// add comment
router.route('/:id/comment').post(authenticate, async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    const { user } = req

    const newComment = {
        createdBy: {
            username: user.username,
            userId: user._id
        },
        comment: comment
    }
    await Post.findOne({ _id: id }).then(post => {
        post.comments = [...post.comments, newComment]
        post.save()
        res.status(200).send(post)
    })
})

// add like
router.route('/:id/like').post(authenticate, async (req, res) => {
    const { id } = req.params
    const { user } = req

    await Post.findOne({ _id: id }).then(post => {
        if (post.likes.some(x => x.userId === user._id.toString())) {
            post.likes = post.likes.filter(x => x.userId !== user._id.toString());
        } else {
            post.likes.push({ userId: user._id });
        }    

        post.save()
        res.status(200).send(post)
    })
})

router.route('/:id/check-status').get(authenticate, async (req, res) => {
    const { id } = req.params
    const post = await Post.findOne({ _id: id })

    if (!post) {
        return res.status(200).json({ status: 'failed' })
    }
    if (!post.image) {
        return res.status(200).json({ status: 'processing' })
    }
    return res.status(200).json({ status: 'success' })
})

router.route('/add-image').post(authenticate, async (req, res) => {
    const { prompt } = req.body
    const { user } = req

    try {
        const combinedQuery = {
            $or: [
              { email: user.email },
              { ipAddress: user.ipAddress }
            ]
        };

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Perform aggregation to count the number of posts for each user in the current month
        const resultTotalPosts = await Post.aggregate([
            {
                $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth,
                },
                },
            },
            {
                $group: {
                _id: '$createdBy.userId',
                postCount: { $sum: 1 },
                },
            },
        ])
        const totalPosts = resultTotalPosts[0].postCount
        console.log('Total number of posts across all users in the current month:', totalPosts)
        if (totalPosts >= 20) {
            return res.status(400).json({ message: 'You have reached the max count for this month' })
        }

        const post = new Post({
            description: '',
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
        await queue.add('generate-image', { prompt, user, postId: post._id })
        res.status(201).send(post)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// generate image
router.route('/').post(authenticate, async (req, res) => {
    const { prompt } = req.body
    const { user } = req
    if (!prompt || !user) {
        return res.status(400)
            .json({ error: 'Prompt or creator data missing.' })
    }
    
    try {
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
        return res.status(201).send(post)
    } catch (error) {
        return res.status(400)
            .json({ error: 'Something went wrong while creating your image.', details: error })
    }
})

// create post
router.route('/:id/create-post').put(authenticate, async (req, res) => {
    const { id } = req.params
    const { description, isPublic } = req.body
    const { user } = req

    try {
        Post.findByIdAndUpdate(id, { description: description, isPublic: isPublic || true }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: 'Post not found.' })
            } else {
                res.status(200).send(docs)
            }
        }) 
    } catch (error) {
        return res.status(400)
            .json({ error: 'Something went wrong while creating your post.', details: error })
    }
})

module.exports = router