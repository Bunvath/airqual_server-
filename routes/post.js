const router = require('express').Router()
const auth = require('../verifyToken')
const Measure = require('../models/Measure')
const Air = require('../models/Air')
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
router.post('/ph', auth, async (req, res) => {
    const measure = new Measure({
        ph: req.body.ph,
        salt: req.body.salt,
        temp: req.body.temp,
        tds: req.body.tds
    })
    try {
        const measureData = await measure.save()
        res.status(200).send({ id: measureData._id })
    } catch (err) {
        res.status(400).send({ error: err, error: "error with upload measurement to database" })
    }
})
module.exports = router