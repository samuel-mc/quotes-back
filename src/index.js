const express = require('express');
const app = express();
const sequelize = require('./db/db.connection');
require('dotenv').config();

// Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

// Arranque del servidor del server y de la base de datos
app.listen(app.get('port'), async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB conected`);
        console.log(`Server on port: ${process.env.PORT}`);
    } catch (error) {
        console.log(`Failed to start`);
    }
})

app.get('/', (req, res) => {
    res.redirect('/quotes');
})

app.use( require('./routes/quotes.routes'));
app.use( require('./routes/author.routes'));