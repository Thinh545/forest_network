const Sequelize = require('sequelize');
const db = require('./db');

const Transaction = db.define('transaction', {
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  operation: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Transaction;
