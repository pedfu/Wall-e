import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    const user = this;
    console.log(user)
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    const user = this
    console.log(user)
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema)

export default User