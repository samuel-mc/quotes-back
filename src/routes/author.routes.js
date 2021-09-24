const express = require('express');
const app = express();

const {
    getAuthors,
    getOneAuthor
} = require ('../controllers/author.controllers');

const {
    getQuotesByAuthor
} = require('../controllers/quotes.controllers');

//Routes
app.get('/authors', getAuthors); //Obtiene todos los autores registrado
app.get('/authors/:id', getOneAuthor); // Obtiene un autor en especifico
app.get('/authors/:id/quotes', getQuotesByAuthor); // Obtiene las frases de un autor en particular

module.exports = app;