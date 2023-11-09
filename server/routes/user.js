import express from "express"
import authenticate from '../middlewares/auth.js'

const router = express.Router()

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Hi ${req.user.username}`})
})

export default router