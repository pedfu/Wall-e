import express from "express";
import * as dotenv from 'dotenv'
import { client, GenerationStyle, Status } from "imaginesdk"
import Post from "../mongodb/models/post.js";

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
        res.status(200).json({ message: 'Comment added' })
    })
})

// generate image
router.route('/').post(async (req, res) => {
    const { prompt, user } = req.body
    if (!prompt || !user) {
        return res.status(400)
            .json({ error: 'Prompt or creator data missing.' })
    }

    // if ip or email already have 10 pictures generated this month, return error

    try {
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
        await post.save()
        return res.send(201)        
    } catch (error) {
        return res.status(400)
            .json({ error: 'Something went wrong while creating your image.' })
    }
})

// create post
router.route('/').put(async (req, res) => {
    const { _id, description, isPublic } = req.body

    try {
        Post.findByIdAndUpdate(_id, { description: description, isPublic: isPublic || true }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: 'Post not found.' })
            } else {
                res.status(200).json(docs)
            }
        }) 
    } catch (error) {
        return res.status(400)
            .json({ error: 'Something went wrong while creating your post.' })
    }
})

export default router