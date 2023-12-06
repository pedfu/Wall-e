const express = require('express')
const emailAuthenticate = require('../middlewares/emailAuth.js')
const { login, register, forgotPassword, confirmCode, updatePassword } = require('../controllers/authentication.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/confirm-code', confirmCode)
router.post('/update-password', emailAuthenticate, updatePassword)

module.exports = router