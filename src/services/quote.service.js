const { Quote } = require('../models/quote.model');

class QuoteService {
    constructor (id_quote){
        this.id_quote = id_quote;
    }

    addQuote(quote, id_author) {
        try {
            Quote.create({
                id_quote: this.id_quote,
                quote,
                id_author
            });
        } catch (error) {
            throw new Error(err);
        }
    }
}

module.exports = { QuoteService };