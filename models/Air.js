const { string, number } = require('@hapi/joi')
const mongoose = require('mongoose')

const air = new mongoose.Schema({
    CO: {
        type: Object

    },
    NO: {
        type: Number
    },
    OX: {
        type: Number
    },
    SO: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Air', air)