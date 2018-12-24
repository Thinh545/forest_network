const Sequelize = require('sequelize');
const db = require('./db');

const Interact = db.define('interact', {
    hash: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
    }
})

module.exports = Interact;