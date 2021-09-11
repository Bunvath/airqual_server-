const { string, number } = require('@hapi/joi')
const mongoose = require('mongoose')

const measure = new mongoose.Schema({
    ph: {
        type: Object

    },
    salt: {
        type: Number
    },
    temp: {
        type: Number
    },
    tds: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Measure', measure)