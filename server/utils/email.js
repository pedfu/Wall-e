import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export default emailTransporter