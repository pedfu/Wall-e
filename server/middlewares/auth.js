import jwt from 'jsonwebtoken'
import User from '../mongodb/models/user.js'

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authentication required' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decodedToken.userId)
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