const router = require('express').Router()
const auth = require('../verifyToken')
const Measure = require('../models/Measure')
const Air = require('../models/Air')
const Particle = require('../models/Particle')
router.post('/air',auth, async (req,res)=>{
    const air = new Air({
        CO : req.body.CO,
        NO : req.body.NO,
        OX : req.body.OX,
        SO : req.body.SO
    })
    try{
        const airData = await air.save()
        res.status(200).send({id: airData._id})
    } catch(err){
        res.status(400).send({error:err, error: " error with upload measurement to database"})
    }
})
router.post('/particle',auth, async (req,res)=>{
    const particle = new Particle({
        PM1 : req.body.PM1,
        PM2_5 : req.body.PM2_5,
        PM10 : req.body.PM10,
    })
    try{
        const particleData = await particle.save()
        res.status(200).send({id: particleData._id})
    } catch(err){
        res.status(400).send({error:err, error: " error with upload measurement to database"})
    }
})

module.exports = router