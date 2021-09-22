const Joi = require('joi');

module.exports.quoteRegistrationDTO = Joi.object().keys({
    name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    quote: Joi.string().min(2).max(255).required()
})