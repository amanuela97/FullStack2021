const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: [2, 'Auhtor name must have atleast 2 characters'],
    },
    born: {
        type: Number,
    },
    bookCount: {
        default: 0,
        type: Number
    },
})

schema.plugin(uniqueValidator, { message: '{VALUE} already exist, name must be unique' })

module.exports = mongoose.model('Author', schema)

