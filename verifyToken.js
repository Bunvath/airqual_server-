const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
    const token = req.header('Authorization');
    console.log(token)
    if(!token){
        res.status(401).send('access denied')
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
    }catch(error){
        res.send(400).send('Invalid Token')
    }
    next()
}