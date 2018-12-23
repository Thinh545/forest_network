const Sequelize = require('sequelize');
const db = require('./db');

const Info = db.define('info', {
    address: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    picture: {
        type: Sequelize.STRING.BINARY,
        defaultValue: null,
    },
    followings: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: null,
    }
})

module.exports = Info;