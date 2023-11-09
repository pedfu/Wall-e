import express from "express";
import * as dotenv from 'dotenv'
import { client, GenerationStyle, Status } from "imaginesdk"
import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";

dotenv.config()

const imagine = client(process.env.IMAGINEART_API_KEY);

const router = express.Router()

// get posts
router.route('/').get(async (req, res) => {    
    await Post.find().then(posts => {
        res.status(200).send(posts)
    })
})

// get post
router.route('/:id').get(async (req, res) => {
    const { id } = req.params
    await Post.findOne({ _id: id }).then(post => {
        res.status(200).send(post)
    })
})

// get comments from post
router.route('/:id/comments').get(async (req, res) => {
    const { id } = req.params
    await Post.findOne({ _id: id }).then(post => {
        res.status(200).send(post.comments)
    })
})

// add comment
router.route('/:id/comment').post(async (req, res) => {
    const { id } = req.params
    const { comment, user } = req.body

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
router.route('/:id/like').post(async (req, res) => {
    const { id } = req.params
    const { user } = req.body

    const newLike = {
        userId: user._id
    }
    await Post.findOne({ _id: id }).then(post => {
        if (post.likes.some(x => x.userId === _id)) {
            post.likes = post.likes.filter(x => x.userId === _id)
        } else {
            post.likes.push(newLike)
        }
        post.save()
        res.status(200).send(post)
    })
})

// generate image
router.route('/').post(async (req, res) => {
    const { prompt, user } = req.body
    if (!prompt || !user) {
        return res.status(400)
            .json({ error: 'Prompt or creator data missing.' })
    }
    
    try {
        // if ip or email already have 10 pictures generated this month, return error
        const possibleUsersByEmail = User.find({ email: user.email })
        const possibleUsersByIP = User.find({ ipAddress: user.ipAddress })
        if ([...possibleUsersByEmail, ...possibleUsersByIP].some(u => u.monthCount >= 10)) {
            return res.status(400).json({ message: 'You have reached the max count for this month' })
        }

        const currUser = User.findOne({ _id: user._id })

        // request for ai art generator
        const response = await imagine.generations(
            `${prompt}`,
            {
              style: GenerationStyle.IMAGINE_V5,
            }
          );
        const image = response.data().base64()

        // create post
        const post = new Post({
            description: '',
            image,
            createdBy: {
                userId: user._id,
                username: user.username
            },
            prompt,
            isPublic: false,
            likes: [],
            comments: []
        })

        currUser.monthCount = currUser.monthCount + 1
        await currUser.save()
        await post.save()
        return res.status(201).send(post)        
    } catch (error) {
        return res.status(400)
            .json({ error: 'Something went wrong while creating your image.' })
    }
})

// create post
router.route('/:id/create-post').put(async (req, res) => {
    const { id } = req.params
    const { description, isPublic } = req.body

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
            .json({ error: 'Something went wrong while creating your post.' })
    }
})

export default router