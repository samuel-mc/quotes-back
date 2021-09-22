const Joi = require("joi");
const { quoteRegistrationDTO } = require('../dto/quotes.dto');

module.exports.checkRegistration = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, quoteRegistrationDTO, "Los datos enviados no son correctos");
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}