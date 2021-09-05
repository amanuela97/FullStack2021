const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controller/blog')
const middleware = require('./utils/middleware')


mongoose.connect(config.DB_URL, config.options).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
