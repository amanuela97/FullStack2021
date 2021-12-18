require('dotenv').config()

const DB_URL = process.env.DB_URL
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const JWT_SECRET = 'SECRET'
module.exports = {
    DB_URL,
    options,
    JWT_SECRET,
}