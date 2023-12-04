import * as utils from '../utils/index.js'
import * as dotenv from 'dotenv'

import User from '../mongodb/models/user.js'
import EmailCode from '../mongodb/models/emailCode.js'
import emailTransporter from '../utils/email.js'

dotenv.config()

const register = async (req, res, next) => {
    const { username, email, password, ipAddress } = req.body

    try {
        const { hash, salt } = utils.generatePassword(password)
        const user = new User({ username, email, password: hash, salt: salt, ipAddress })
        await user.save()

        const { token, expiredIn } = utils.issueJWT(user)
        res.status(200).json({ token, expiredIn, user })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({
            $or: [
              { username: username },
              { email: username }
            ]
        })
    
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username or password'})
        }
    
        const isPasswordValid = utils.isPasswordValid(password, user.password, user.salt)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect username or password'})
        }
    
        const { token, expiredIn } = utils.issueJWT(user) 
        res.status(200).json({ token, user, expiredIn })
    } catch (error) {
        next(error)
    }
}

// verify if email exists and send code to user email
const forgotPassword = async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: 'Email account does not exist'})
    
    const randomCode = utils.generateRandomCode(5).toUpperCase()

    // send email with code
    emailTransporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Wall-E - Email verification',
        text: `Hi! I have heard you forgot your password and want to update it, right?\nHere is your code: ${randomCode}`
    }, async (error, info) => {
        if (error) {
            return res.status(404).json({ error: 'Something unexpected happened while sending code' })
        }
        const emailCode = new EmailCode({ email: user.email, code: randomCode })
        await emailCode.save()
        return res.status(200).send('Email sent')
    })
}

// confirm code and create an token with user email
const confirmCode = async (req, res, next) => {
    const { code, email } = req.body

    // get last code created
    const emailCode = await EmailCode.findOne({ email: email }).sort({ _id: -1 });
    if (!emailCode) return res.status(400).json({ error: 'Incorrect code' })

    // Check if the email code was created more than 10 minutes ago
    const tenMinutesInMilliseconds = 10 * 60 * 1000;
    if (new Date() - emailCode.createdAt > tenMinutesInMilliseconds) {
      return res.status(403).json({ error: 'Email code expired' });
    }

    // another if for garantee (even tho already verified in the database get)
    if (code === emailCode.code) {
        const { token, expiresIn } = utils.issueForgotPasswordJWT(email)
        return res.status(200).json({ token, expiresIn })
    }

    return res.status(400).json({ error: 'Incorrect code' })
}

const updatePassword = async (req, res, next) => {
    const { newPassword, confirmationPassword } = req.body

    if (newPassword !== confirmationPassword) return res.status(400).json({ error: 'Passwords do not match' })

    const user = await User.findOne({ email: req.email })
    if (!user) return res.status(400).json({ error: 'Something unexpected happened' })

    const { salt, hash } = utils.generatePassword(newPassword)
    user.salt = salt
    user.password = hash
    await user.save()

    res.status(200).send('User password updated')
}

export {
    register,
    login,
    forgotPassword,
    confirmCode,
    updatePassword
}