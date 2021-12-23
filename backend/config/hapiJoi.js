const Joi = require('@hapi/joi')

const LoginValidation = (data) => {
    const schema = Joi.object({
        Email: Joi
            .string()
            .min(6)
            .required()
            .email(),
        Password: Joi
            .string()
            .min(6)
            .required()
    })
    const validation = schema.validate(data)
    return validation
}

const SigninValidation = (data) => {
    const schema = Joi.object({
        Name: Joi
            .string()
            .min(6)
            .required(),
        Email: Joi
            .string()
            .min(6)
            .required()
            .email(),
        Password: Joi
            .string()
            .min(6)
            .required()
    })

    const validation = schema.validate(data)
    return validation

}

module.exports = {
    LoginValidation,
    SigninValidation
}