import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

import User from '../mongodb/models/user.js'

const PUBLIC_KEY = process.env.PUBLIC_KEY

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authentication required' })
    }

    try {
        const decodedToken = jwt.verify(token, PUBLIC_KEY)
        const user = await User.findById(decodedToken.sub)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

export default authenticate