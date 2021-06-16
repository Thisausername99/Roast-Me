const Joi = require('joi');
//regex pattern:
/*at least one upper case*/
/*at least one lower case*/
/*at least one special character*/
/*minimum length of 8*/
const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

// validate register info
const validRegis = (data) => {
    const regisSchema = Joi.object({
        personal: Joi.object().keys({
            name : Joi.string().min(6).required(),
            email : Joi.string().required().email()
        }),
        password : Joi.string().regex(pattern).min(8).max(20).required()
    })
    return regisSchema.validate(data);
}

// validate login info
const validLogin = (data) => {
    const loginSchema = Joi.object({
        email : Joi.string().required().email(),
        password : Joi.string().min(8).required()
    });
    return loginSchema.validate(data);
}

module.exports = {
    forSignup : validRegis,
    forLogin : validLogin
}