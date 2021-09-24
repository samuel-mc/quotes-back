const express = require('express');
const app = express();

const {
    createQuote,
    readQuotes,
    getRandomQuote,
    getOneQuote,
    postQuote,
    deleteQuote
} = require('../controllers/quotes.controllers');

const {
    checkExistingAuthor
} = require('../middlewares/authors.midd');

const {
    checkRegistration,
    quoteExists
} = require('../middlewares/quotes.midd')

// Routes
app.post('/quotes', checkRegistration, checkExistingAuthor, createQuote); //Postea de una frase si los campos son correctos
app.get('/quotes', readQuotes) // Obtiene todas las frases que hay en nuestro sistema.
app.get('/quotes/ramdom', getRandomQuote); // Obtiene una frase aleatoria.
app.get('/quotes/:id', getOneQuote); // Obtiene una frase de acuerdo al id.
app.put('/quotes/:id', checkExistingAuthor, postQuote); // Modifica una frase.
app.delete('/quotes/:id', quoteExists, deleteQuote); // Elimina una frase.

module.exports = app;