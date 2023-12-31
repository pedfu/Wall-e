const mongoose = require("mongoose");

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
    image: { type: String },
    description: { type: String },
    prompt: { type: String, required: true },
    likes: [{
        userId: { type: String, required: true },
    }],
    isPublic: { type: Boolean, default: true },
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post