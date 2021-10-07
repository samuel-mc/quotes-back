const { AuthorService } = require('../services/author.service');
const { QuoteService } = require('../services/quote.service');

const { v4: uuidv4 } = require('uuid');


const createQuote = async (req, res) => {
    const { quote } = req.body; //Recibe estos datos del body
    let id_author = req.id_author; // Recibe estos datos de un middlware
    try {
        // Creamos un autor si no existe en la base de datos
        if (!id_author) {
            id_author = uuidv4(); // Al autor le asigna un identificador unico.
            const author = new AuthorService(id_author);
            await author.addAuthor(req.body.name, req.body.last_name);
        }

        const id_quote = uuidv4(); // A la cita asigna un identificador unico.
        const quoteInstance = new QuoteService(id_quote);
        await quoteInstance.addQuote(quote, id_author);

        res.status(201).json({ 'message': 'Quote agregada con exito.' });
    } catch (error) {
        res.status(400).json({ "message": "Error creating the quote: " + error.message});
    }
}

const readQuotes = async (req, res) => {
    try {
        const quotes = await QuoteService.getAllQuotes();
        res.status(200).json({ 'quotes': quotes });
    } catch (error) {
        res.status(400).json({ "message": "Error reading the quotes: " + error.message});
    }
}

const getRandomQuote= async (req, res) => {
    try {
        const quote = await QuoteService.getRandomQuote();
        res.status(200).json(quote);
    } catch (error) {
        res.status(400).json({ "message": "Error reading the quote: " + error.message});
    }
}

const getOneQuote = async (req, res) => {
    let quote =  new QuoteService(req.params.id);
    try {
        quote = await quote.getByID();
        !quote
            ? res.status(404).json({ "message": "Error, quote not found" })
            : res.status(200).json(quote);
    } catch (error) {
        res.status(400).json({ "message": "Error reading the quote: " + error.message});
    }
}

const getQuotesByAuthor = async (req, res) => {
    const id_author = req.params.id;
    try {
        const quotes = await QuoteService.getQuotesByAuthorId(id_author);
        !quotes
            ? res.status(404).json({ "message": "Error: quotes not found" })
            : res.status(200).json(quotes);
    } catch (error) {
        res.status(400).json({ "message": "Error reading the quote: " + error.message});
    }
}

const postQuote = async (req, res) => {
    const { quote } = req.body; //Recibe estos datos del body
    let id_author = req.id_author;
    try {
        if(!id_author) {
            id_author = uuidv4();
            const author = new AuthorService(id_author);
            await author.addAuthor(req.body.name, req.body.last_name);
        }
        let quoteInstance = new QuoteService(req.params.id);
        await quoteInstance.updateQuote(quote, id_author);
        res.status(200).json({ "message": "Quote updated successfully."});
    } catch (error) {
        res.status(500).json({ "message": "Error updating quote." });
    }

}

const likeQuote = async ( req, res ) => {
    const quote = new QuoteService(req.params.id_quote);
    const author = new AuthorService(req.params.id_author);
    try {
        quote.incrementLikes();
        author.incrementLikes();
        res.status(200).json({ "message": "Quote updated successfully."});
    } catch (error) {
        res.status(500).json({ "message": "Error updating quote." });
    }
}

const dislikeQuote = async ( req, res ) => {
    const quote = new QuoteService(req.params.id_quote);
    const author = new AuthorService(req.params.id_author);
    try {
        quote.decrementLikes();
        author.decrementLikes();
        res.status(200).json({ "message": "Quote updated successfully."});
    } catch (error) {
        res.status(500).json({ "message": "Error updating quote." });
    }
}

const deleteQuote = async (req, res) => {
    let quote = new QuoteService(req.params.id);
    try {
        await quote.removeQuote();
        res.status(200).json({ "message": "Quote deleted successfully"});
    } catch (error) {
        res.status(400).json({ "message": "Error deleting the quote: " + error.message });
    }
}

module.exports = {
    createQuote,
    readQuotes,
    getRandomQuote,
    getOneQuote,
    getQuotesByAuthor,
    postQuote,
    likeQuote,
    dislikeQuote,
    deleteQuote
}