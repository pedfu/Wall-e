import express from 'express'
import emailAuthenticate from '../middlewares/emailAuth.js'
import { login, register, forgotPassword, confirmCode, updatePassword } from '../controllers/authentication.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/confirm-code', confirmCode)
router.post('/update-password', emailAuthenticate, updatePassword)

export default router