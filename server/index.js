import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieSession from 'cookie-session'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js' 
import authRoutes from './routes/auth.js' 
import userRoutes from './routes/user.js'

dotenv.config()
const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "wall-e-session",
      keys: [process.env.COOKIE_SECTION_SECRET],
      httpOnly: true
    })
  );

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

app.get('/', async (req, res) => {
    res.status(400)
    res.send('Hello from DALL-E!')
})

app.post('/login', async (req, res) => {
    res.status(400).send({
        user: {name: 'test-user'},
        key: 'test-key'
    })
})

const startServer = () => {
    try {
        connectDB(MONGODB_URL)
        app.listen(PORT, () => {
            console.log('Server has started!')
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()