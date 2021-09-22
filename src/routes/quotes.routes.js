const express = require('express');
const app = express();

const {
    createQuote
} = require('../controllers/quotes.controllers');

const {
    checkExistingAuthor
} = require('../middlewares/authors.midd');

const {
    checkRegistration
} = require('../middlewares/quotes.midd')

// CRUD quotes
app.post('/quotes', checkRegistration, checkExistingAuthor, createQuote);

module.exports = app;