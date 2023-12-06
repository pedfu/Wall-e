const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieSession = require('cookie-session')

const utils = require('./utils/index.js')

const connectDB = require('./mongodb/connect.js')
const postRoutes = require('./routes/postRoutes.js' )
const authRoutes = require('./routes/auth.js' )
const userRoutes = require('./routes/user.js')

dotenv.config()
const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

app.get('/test', (req, res) => {
    res.send('Hiii')
})

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

// ONLY CALL THIS ONE TIME (YOU NEED TO UNCOMMENT FILE GENERATION IN generateKeyPair function)
app.get('/generate-key', (req, res) => {
    // utils.generateKeyPair()
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