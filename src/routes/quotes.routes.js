const express = require('express');
const app = express();

const {
    createQuote,
    readQuotes,
    getRandomQuote
} = require('../controllers/quotes.controllers');

const {
    checkExistingAuthor
} = require('../middlewares/authors.midd');

const {
    checkRegistration
} = require('../middlewares/quotes.midd')

// Routes
app.post('/quotes', checkRegistration, checkExistingAuthor, createQuote); //Postea de una frase si los campos son correctos
app.get('/quotes', readQuotes) // Obtiene todas las frases que hay en nuestro sistema.
app.get('/quote', getRandomQuote); // Obtiene una frase aleatoria.

module.exports = app;