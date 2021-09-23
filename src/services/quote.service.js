const { Quote } = require('../models/quote.model');
const { Author } = require('../models/author.model');

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

    static async getAllQuotes() {
        try {
            const quotes = await Quote.findAll({
                include: { model: Author },
                attributes: {
                    exclude: ['id_author']
                },
            });
            return quotes;
        } catch (error) {
            throw new Error(err);
        }
    }

    static async getRandomQuote() {
        try {
            const quotes = await QuoteService.getAllQuotes();
            const index = Math.floor(Math.random() * (quotes.length));
            return quotes[index];
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = { QuoteService };