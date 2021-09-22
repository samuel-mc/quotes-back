const express = require('express');
const app = express();
const sequelize = require('./db/db.connection');
require('dotenv').config();

// Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arranque del servidor del server y de la base de datos
app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB conected`);
        console.log(`Server on port: ${process.env.PORT}`);
    } catch (error) {
        console.log(`Failed to start`);
    }
})

app.use( require('./routes/quotes.routes'));