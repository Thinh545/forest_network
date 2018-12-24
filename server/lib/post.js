const Sequelize = require('sequelize');
const db = require('./db');

const Post = db.define('post', {
    hash: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    author: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING.BINARY,
    },
    keys: {
        type: Sequelize.ARRAY(Sequelize.CHAR),
    }
});

module.exports = Post;
