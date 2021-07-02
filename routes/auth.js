const router = require('express').Router()
const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




router.post('/register', async(req,res)=>{
  

   

    //CHECKING IF THE EMAIL EXIST
    const existedEmail = await User.findOne({email:req.body.email})
    if (existedEmail){
        return res.status(400).send({
            message:"Email or Username has already existed"
        })
    }

    //CHECKING IS THERE ANY VALIDATION ERROR
    error = registerValidation(req.body)
    if (error){
        return res.status(400).send({
            message: (error.details[0].message)
        })
    }   

    //PASSWORD ENCRYPTION

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(req.body.password,salt)

    //POSTING THE USER TO DATABASE
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:encryptedPassword
    });

    try{
        const savedUser = await user.save()
        res.status(200).send({id :savedUser._id})
    }catch(err){
        res.status(400).send({error:err,error:"error with upload user to database"})
    }
})

router.post('/login',async(req,res)=>{

    //validate the input 
    error = loginValidation(req.body)
    if (error){
        return res.status(400).send({
            message: (error.details[0].message)
        })
    }

    //CHECKING EXISTED USER
    const existedUser = await User.findOne({email:req.body.email})
    
    const validPass = await bcrypt.compare(req.body.password,existedUser.password)


    if (!existedUser || !validPass){
        return res.status(400).send('Enter incorrect email or password')
    }
    const token= jwt.sign( {_id:existedUser._id},process.env.SECRET,{
        expiresIn: '60min'
    })
    res.header('Authorization',token )
    res.status(200).send({
        token:token,
        status:'Login'
    })

})

module.exports = router 