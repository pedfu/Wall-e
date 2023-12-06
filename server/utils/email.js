const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

module.exports = emailTransporter