const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const app = express()
const mongoose = require('mongoose')

//IMPORT ROUTE
// const ph = require('../routes/ph')
const auth = require('../routes/auth')
const post = require('../routes/post')

// SETTING UP ENVIRONMENT VARIABLE
dotenv.config()
// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, { useNewUrlParser: true }, () => console.log("DB connected"))


//MIDDLEWARE

app.use(express.json())
// app.use('/api/user',ph)
app.use('/api/user', auth)
app.use('/api/post', post)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

module.exports = app