const joi = require('@hapi/joi')


const registerValidation = (req)=>{
    const scheme = joi.object({
        name:joi.string() 
                .min(6)
                .required(),
        email:joi.string()
                .min(6)
                .required()
                .email(),
        password: joi.string()
                .min(6)
                .required()
    })
    let {error} = scheme.validate({
        name : req.name,
        email : req.email,
        password : req.password
    })
    return error
}
const loginValidation = (req)=>{
    const scheme = joi.object({
        email:joi.string()
                .min(6)
                .required()
                .email(),
        password: joi.string()
                .min(6)
                .required()
    })
    let {error} = scheme.validate({
        email : req.email,
        password : req.password
    })
    return error
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation