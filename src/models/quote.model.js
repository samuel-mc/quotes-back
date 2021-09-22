const { Sequelize } = require('sequelize');
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
    id_author: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'authors',
            key: 'id_author'
        }
    }
},{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = { Quote }