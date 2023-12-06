const express = require("express")
const authenticate = require('../middlewares/auth.js')

const router = express.Router()

router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Hi ${req.user.username}`})
})

module.exports = router