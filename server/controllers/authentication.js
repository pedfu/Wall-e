import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../mongodb/models/user.js'

const register = async (req, res, next) => {
    const { username, email, password, ipAddress } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword, ipAddress })
        await user.save()
        
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })
        res.json({ token, user })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
    
        if (!user) {
            return res.status(404).json({ error: 'Username not found'})
        }
    
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password'})
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })
        res.json({ token, user })
    } catch (error) {
        next(error)
    }
}

export {
    register,
    login
}