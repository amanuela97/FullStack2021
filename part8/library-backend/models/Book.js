const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: [4, 'title must have atleast 4 characters'],
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [{type: String}],
})

schema.plugin(uniqueValidator, { message: '{VALUE} already exist, title must be unique' })

module.exports = mongoose.model('Book', schema)