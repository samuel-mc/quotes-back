const { AuthorService } = require('../services/author.service');
const { QuoteService } = require('../services/quote.service');

const { v4: uuidv4 } = require('uuid');


const createQuote = async (req, res) => {
    const { name, last_name, quote } = req.body; //Recibe estos datos del body
    let id_author = req.id_author; // Recibe estos datos de un middlware
    try {
        // Creamos un autor si no existe en la base de datos
        if (!id_author) {
            id_author = uuidv4(); // Al autor le asigna un identificador unico.
            const author = new AuthorService(id_author);
            await author.addAuthor(name, last_name);
        }

        const id_quote = uuidv4(); // A la cita asigna un identificador unico.
        const quoteInstance = new QuoteService(id_quote);
        await quoteInstance.addQuote(quote, id_author);
        
        res.status(201).json({ 'message': 'Quote agregada con exito.' });
    } catch (error) {
        res.status(400).json({ "message": "Error: " + error.message});
    }
}

module.exports = {
    createQuote
}