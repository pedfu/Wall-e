import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    createdBy: {
        username: { type: String, required: true },
        userId: { type: String, required: true }
    },
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
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post