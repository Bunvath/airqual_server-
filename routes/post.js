const router = require('express').Router()
const auth = require('../verifyToken')

router.post('/ph',auth,(req,res)=>{
    res.send('Send ph data')
})
module.exports = router