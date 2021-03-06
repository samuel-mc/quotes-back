const express = require('express');
const app = express();

const {
    getAuthors,
    getOneAuthor,
    putAuthor,
} = require ('../controllers/author.controllers');

const {
    getQuotesByAuthor
} = require('../controllers/quotes.controllers');

//Routes
app.get('/authors', getAuthors); //Obtiene todos los autores registrado
app.get('/authors/:id', getOneAuthor); // Obtiene un autor en especifico
app.get('/authors/:id/quotes', getQuotesByAuthor); // Obtiene las frases de un autor en particular
app.put('/authors/:id', putAuthor);

module.exports = app;