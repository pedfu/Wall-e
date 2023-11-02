import express from "express";
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { client, GenerationStyle, Status } from "imaginesdk"

const imagine = client(process.env.IMAGINEART_API_KEY);

import PostSchema from "../mongodb/models/post.js";

dotenv.config()

const router = express.Router()

router.route('/').get(async (req, res) => {    
    res.send('teste')
})

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
        const post = new PostSchema({
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

router.route('/').put(async (req, res) => {
    const { _id, description, isPublic } = req.body

    try {
        PostSchema.findByIdAndUpdate(_id, { description: description, isPublic: isPublic || true }, (err, docs) => {
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