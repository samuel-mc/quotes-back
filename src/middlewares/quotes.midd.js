const Joi = require("joi");
const { quoteRegistrationDTO } = require('../dto/quotes.dto');
const { QuoteService } = require('../services/quote.service');

module.exports.checkRegistration = async (req, res, next) => {
    try {
        await Joi.attempt(req.body, quoteRegistrationDTO, "Los datos enviados no son correctos");
        return next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports.quoteExists = async (req, res, next) => {
    let quote = new QuoteService(req.params.id);
    try {
        quote = await quote.getByID();
        !quote
            ? res.status(404).json({ "message": "Quote not found"})
            : next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}