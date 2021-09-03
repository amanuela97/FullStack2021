require('dotenv').config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = {
  PORT,
  DB_URL,
  options
}