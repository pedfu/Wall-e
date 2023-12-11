const dotenv = require('dotenv')
const Bull = require('bull')
const { generateImageWithImagineAI, generateImageWithEdenAI } = require('./controllers/imageGeneration')

dotenv.config()

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT
const redisPassword = process.env.REDIS_PASSWORD
const queueName = 'bg_job'

const redisConfig = {
    redis: { 
        port: redisPort, 
        host: redisHost, 
        password: redisPassword 
    }
}

const queue = new Bull(queueName, redisConfig)
queue.process('generate-image', async (job, done) => {
    await generateImageWithEdenAI(job.data?.prompt, job.data?.user, job.data?.postId)
    done()
})

module.exports.addItemToQueue = async (prompt, user) => {
    await queue.add({ prompt, user })
}

module.exports = { queue }