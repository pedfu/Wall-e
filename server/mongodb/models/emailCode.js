import mongoose from "mongoose";

const EmailCodeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
}, { timestamps: true })

const EmailCode = mongoose.model('EmailCode', EmailCodeSchema)

export default EmailCode