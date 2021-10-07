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
                id_author,
                likes: 0
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllQuotes() {
        try {
            const quotes = await Quote.findAll({
                include: { model: Author },
                attributes: {
                    exclude: ['id_author']
                },
                order: [
                    ['likes', 'DESC'],
                ]
            });
            return quotes;
        } catch (error) {
            throw new Error(error);
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

    getByID() {
        try {
            const quote = Quote.findOne({
                where: { id_quote: this.id_quote },
                include: { model: Author },
                attributes: {
                    exclude: ['id_author']
                },
            });
            return quote;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getQuotesByAuthorId(id_author) {
        try {
            const quotes = Quote.findAll({
                where: { id_author },
                include: { model: Author },
                attributes: {
                    exclude: ['id_author']
                },
            });
            return quotes;
        } catch (error) {
            throw new Error(error);
        }
    }

    incrementLikes(){
        try {
            Quote.increment('likes', { where: { id_quote: this.id_quote } });
        } catch (error) {
            throw new Error(error);
        }
    }

    decrementLikes(){
        try {
            Quote.decrement('likes', { where: { id_quote: this.id_quote } });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateQuote(quote, id_author) {
        try {
            Quote.update({ quote, id_author},{ where: { id_quote: this.id_quote }});
        } catch (error) {
            throw new Error(error);
        }
    }

    removeQuote () {
        try {
            Quote.destroy({ where: { id_quote: this.id_quote }});
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = { QuoteService };