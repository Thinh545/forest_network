const Sequelize = require('sequelize');
const db = require('./db');

const Block = db.define('block', {
  height: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Block;
