const Sequelize = require('sequelize');
let pg = require('pg')
pg.defaults.ssl = true;
    
const db = new Sequelize({
    host: 'localhost',
    port: 5432,
    database: 'hoami_forest',
    username: 'admin',
    password: 'admin',
    dialect: 'postgres',
})

module.exports = db;
