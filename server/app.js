const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const app = express()
const mongoose = require('mongoose')

//IMPORT ROUTE
// const ph = require('../routes/ph')
const auth = require('../routes/auth')
const post = require('../routes/post')
const get = require('../routes/get')

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/html");

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'https://kohkjongadmin.web.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// SETTING UP ENVIRONMENT VARIABLE
dotenv.config()
// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, { useNewUrlParser: true }, () => console.log("DB connected"))


//MIDDLEWARE

app.use(express.json())
// app.use('/api/user',ph)
app.use('/api/user', auth)
app.use('/api/post', post)
app.use('/api/get', get)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

module.exports = app