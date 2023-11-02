import mongoose from 'mongoose'

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ipAddress: { type: String, required: true },
    profilePicture: { type: String, required: true },
    followers: [{
        userId: { type: String, required: true },
        username: { type: String, required: true },
    }],
    following: [{
        userId: { type: String, required: true },
        username: { type: String, required: true },
    }],
})

const UserSchema = mongoose.Model('User', User)

export default UserSchema