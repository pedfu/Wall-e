import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const PUBLIC_KEY = fs.readFileSync(path.resolve() + '/id_public.pem')

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authentication required' })
    }

    try {
        const decodedToken = jwt.verify(token, PUBLIC_KEY)
        req.email = decodedToken.sub
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

export default authenticate