const router = require('express').Router()
const auth = require('../verifyToken')
const Measure = require('../models/Measure')

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