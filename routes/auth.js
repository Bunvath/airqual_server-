const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//FIND USER WHETHER THE EMAIL IS EXISTED OR NOT 
router.get('/finduser', async (req, res) => {
    var email = req.query
    const existedUser = await User.findOne(email)
    if (existedUser) {
        return res.json({
            status: true
        })
    }
    return res.json({
        status: false
    })

})

router.get('/active',(req,res)=>{
    res.send("server active")
})
router.post('/getToken', (req, res) => {
    console.log("request token")
    const secret = req.body.secret
    console.log(req.body)
    if (secret == process.env.SECRET) {
        var token = jwt.sign(true, secret)
        res.setHeader('Content-Type', 'text/plain')
        res.status(200).json({ secretToken: token })
    }else{
        res.status(400).json({ message: "Enter wrong secret" })
    }
})

router.post('/register', async (req, res) => {
    console.log("registered calling")
    //CHECKING IF THE EMAIL EXIST
    const existedEmail = await User.findOne({ email: req.body.email })
    if (existedEmail) {
        return res.status(400).send({
            message: "Email or Username has already existed"
        })
    }

    //CHECKING IS THERE ANY VALIDATION ERROR
    error = registerValidation(req.body)
    if (error) {
        return res.status(400).send({
            message: (error.details[0].message)
        })
    }

    //PASSWORD ENCRYPTION

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(req.body.password, salt)

    //POSTING THE USER TO DATABASE
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    try {
        const savedUser = await user.save()
        res.status(200).send({ id: savedUser._id })
    } catch (err) {
        res.status(400).send({ error: err, error: "error with upload user to database" })
    }
})

router.post('/login', async (req, res) => {
    console.log("calling login")

    //validate the input 
    error = loginValidation(req.body)
    if (error) {
        return res.status(400).send({
            message: (error.details[0].message)
        })
    }

    //CHECKING EXISTED USER
    const existedUser = await User.findOne({ email: req.body.email })
    let userStatus = existedUser.status

    const validPass = await bcrypt.compare(req.body.password, existedUser.password)
    if (!existedUser || !validPass) {
        return res.status(400).json({
            message: "Enter incorrect email or password"
        })
    }
    else if (!userStatus) {
        return res.status(400).json({
            message: "Your account is not yet verified, please go to verify your account"
        })
    }
    const token = jwt.sign({ _id: existedUser._id }, process.env.SECRET, {
        expiresIn: '60min'
    })
    res.header('Authorization', token)
    res.status(200).send({
        token: token,
        status: 'Login'
    })

})

module.exports = router