import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

import User from '../mongodb/models/user.js'

const PUBLIC_KEY = fs.readFileSync(path.resolve() + '/id_public.pem')

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authentication required' })
    }

    try {
        const decodedToken = jwt.verify(token, PUBLIC_KEY)
        const user = await User.findById(decodedToken.payload.sub)
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