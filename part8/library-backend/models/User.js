const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: [4, 'username must have atleast 4 characters'],
    },
    favoriteGenre: {
        type: String,
    },
})

schema.plugin(uniqueValidator, { message: '{VALUE} already exist, username must be unique' })

module.exports = mongoose.model('User', schema)