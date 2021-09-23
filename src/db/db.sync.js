const { Quote } = require('../models/quote.model');
const { Author } = require('../models/author.model');

// Author.sync().then(() => {
//     console.log('Tabla "Author" creada');
// })

Quote.sync().then( () => {
    console.log('Tabla "Quotes" creada');
})
