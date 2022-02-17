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
    res.setHeader("Content-Type", "text/json");
    const allowedOrigins = ['http://localhost:50277','http://localhost:4200','http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Website you wish to allow to connect

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


module.exports = app