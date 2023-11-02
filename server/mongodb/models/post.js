import mongoose from "mongoose";

const Post = new mongoose.Schema({
    createdBy: {
        username: { type: String, required: true },
        userId: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        createdBy: {
            username: { type: String, required: true },
            userId: { type: String, required: true }
        },
        comment: { type: String, required: true }, 
    }],
    image: { type: String, required: true },
    description: { type: String, required: true },
    prompt: { type: String, required: true },
    likes: [{
        userId: { type: String, required: true },
    }],
    isPublic: { type: Boolean, default: true },
})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema