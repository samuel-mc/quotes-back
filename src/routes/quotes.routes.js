const express = require('express');
const app = express();

const {
    createQuote
} = require('../controllers/quotes.controllers');

const {
    checkExistingAuthor
} = require('../middlewares/authors.midd');

// CRUD quotes
app.post('/quotes', checkExistingAuthor, createQuote);

module.exports = app;