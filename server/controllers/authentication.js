import * as utils from '../utils/index.js'

import User from '../mongodb/models/user.js'

const register = async (req, res, next) => {
    const { username, email, password, ipAddress } = req.body

    try {
        const { hash, salt } = utils.generatePassword(password)
        console.log('SALVNADO', hash)
        const user = new User({ username, email, password: hash, salt: salt, ipAddress })
        await user.save()

        const { token, expiredIn } = utils.issueJWT(user)
        res.json({ token, expiredIn, user })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
    
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username or password'})
        }
    
        const isPasswordValid = utils.isPasswordValid(password, user.password, user.salt)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect username or password'})
        }
    
        const { token, expiredIn } = utils.issueJWT(user) 
        res.json({ token, user, expiredIn })
    } catch (error) {
        next(error)
    }
}

export {
    register,
    login
}