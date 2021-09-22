const { Quote } = require('../models/quotes.model');
const { Author } = require('../models/author.model');

Quote.sync().then( () => {
    console.log('Tabla "Quotes" creada');
})

Author.sync().then(() => {
    console.log('Tabla "Author" creada');
})