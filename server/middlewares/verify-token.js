import jwt from 'jsonwebtoken'
import User from '../mongodb/models/user'

const verifyToken = (req, res, next) => {
    let token = req.session.token

    if (!token) {
        return res.status(403).send({ error: 'No token provided' })
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
            return res.status(401).send({ error: 'Unatuhorized!' })
        }
        const user = await User.findById(decodedToken.userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        req.user = user
        next()
    })
}

export default verifyToken