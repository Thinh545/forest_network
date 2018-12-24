const Sequelize = require('sequelize');
const db = require('./db');

const Info = db.define('info', {
    address: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING.BINARY,
        defaultValue: null,
    },
    picture: {
        type: Sequelize.STRING.BINARY,
        defaultValue: null,
    },
    followings: {
        type: Sequelize.STRING.BINARY,
        defaultValue: null,
    }
})

module.exports = Info;