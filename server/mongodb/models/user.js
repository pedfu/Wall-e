import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    ipAddress: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ['user', 'biguser', 'superuser', 'admin'], default: 'user' },
    followers: [{
        userId: { type: String, required: true },
        username: { type: String, required: true },
    }],
    following: [{
        userId: { type: String, required: true },
        username: { type: String, required: true },
    }],
    monthCount: { type: Number, default: 0, }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User