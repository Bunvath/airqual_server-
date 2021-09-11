const mongoose = require('mongoose')

//CREATE NEW MONGOOSE SCHEME
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,


    },
    email: {
        type: String,
        required: true,
        min: 10,

    },
    password: {
        type: String,
        required: true,
        min: 10

    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('User', user)