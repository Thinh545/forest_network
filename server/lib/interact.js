const Sequelize = require('sequelize');
const db = require('./db');
const Transaction = require('./transaction');

const Interact = db.define('interact', {
    hash: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.SMALLINT,
    },
    content: {
        type: Sequelize.STRING.BINARY,
    }
})

module.exports = Interact;