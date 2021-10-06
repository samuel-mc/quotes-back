const { Sequelize } = require('sequelize');
// const { Author } = require('./author.model');
const db = require('../db/db.connection');

const Quote = db.define('quote', {
    id_quote: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    quote: {
        type: Sequelize.STRING,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

// Author.hasMany(Quote);
// Quote.belongsTo(Author);

module.exports = { Quote }