const express = require('express');
const dotenv = require('dotenv')
const Post = require('../mongodb/models/post.js');
const authenticate = require('../middlewares/auth.js')
const { queue } = require('../queue.js');
const User = require('../mongodb/models/user.js');

dotenv.config()

const router = express.Router()

// get posts
router.route('/').get(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 20

    const allPosts = await Post.find().skip((page - 1) * pageSize).limit(pageSize)
    const totalCount = await Post.countDocuments()
    
    const nextPage = (page * pageSize < totalCount) ? page + 1 : null
    res.status(200).json({ posts: allPosts, totalCount, nextPage })
})

// get user posts
router.route('/my-posts').get(authenticate, async (req, res) => {
    const { user } = req
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 20

    const allPosts = await Post.find({ 'createdBy.userId': user._id }).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize)
    const totalCount = await Post.countDocuments({ 'createdBy.userId': user._id });
    
    const nextPage = (page * pageSize < totalCount) ? page + 1 : null
    res.status(200).json({ posts: allPosts, totalCount, nextPage })
})

// get liked posts
router.route('/liked').get(authenticate, async (req, res) => {
    const { user } = req
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 20

    const allPosts = await Post.find({ 'likes.userId': user._id.toString() }).skip((page - 1) * pageSize).limit(pageSize)
    const totalCount = await Post.countDocuments({ 'likes.userId': user._id.toString() })
    
    const nextPage = (page * pageSize < totalCount) ? page + 1 : null
    res.status(200).json({ posts: allPosts, totalCount, nextPage })
})

// get post
router.route('/:id').get(async (req, res) => {
    const { id } = req.params
    if (!id || id === 'undefined') return 
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
        let liked;
        if (post.likes.some(x => x.userId === user._id.toString())) {
            post.likes = post.likes.filter(x => x.userId !== user._id.toString());
            liked = false
        } else {
            post.likes.push({ userId: user._id });
            liked = true
        }    

        post.save()
        res.status(200).send({...post._doc, liked})
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
          
        // Get all users based on the combined query
        const users = await User.find(combinedQuery);
        const userIds = users.map(user => user._id.toString());
        
        if (!user?.isAdmin) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);          
            
            // Perform aggregation to count the number of posts for each user in the current month
            const resultTotalPosts = await Post.aggregate([
            {
                $match: {
                'createdBy.userId': { $in: userIds },
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
            ]);

        const totalPosts = resultTotalPosts?.reduce((prev, curr) => prev + curr?.postCount, 0)
        console.log('Total number of posts across all users in the current month:', totalPosts)
        if (totalPosts >= 20) {
            return res.status(400).json({ message: 'You have reached the max count for this month' })
        }
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

module.exports = router