const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieSession = require('cookie-session')

const connectDB = require('./mongodb/connect.js')
const postRoutes = require('./routes/postRoutes.js' )
const authRoutes = require('./routes/auth.js' )
const userRoutes = require('./routes/user.js')
const { generateImage, inngest } = require('./controllers/inngest.js')

const { serve } = require('inngest/lambda')

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

app.use(
    "/api/v1/inngest",
    serve({ client: inngest, functions: [generateImage] })
);

app.get('/', async (req, res) => {
    res.status(400)
    res.send('Hello from DALL-E!')
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