const { string, number } = require('@hapi/joi')
const mongoose = require('mongoose')

const particle = new mongoose.Schema({
    PM1: {
        type: Object

    },
    PM2_5: {
        type: Object
    },
    PM10: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Particle', particle)