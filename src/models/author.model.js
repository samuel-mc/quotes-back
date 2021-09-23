const { Sequelize } = require('sequelize');
const { Quote } = require('./quote.model');
const db = require('../db/db.connection');

const Author = db.define('author', {
    id_author: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    }

},{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

Author.hasMany(Quote, { as: 'Quotes', foreignKey: 'id_author'});
Quote.belongsTo(Author, {foreignKey: 'id_author'});

module.exports = { Author }