const Sequelize = require('sequelize');
let pg = require('pg')
pg.defaults.ssl = true;

// const db = new Sequelize({
//   host: 'ec2-54-235-169-191.compute-1.amazonaws.com',
//   port: 5432,
//   database: 'd8hk98cpg9aa9i',
//   username: 'skvkkeslzwdndf',
//   password: 'b7bf4cbee85eed2fe76d59d5f7ad7d5e6ff7798fb4693ede770d65e88924da2e',
//   dialect: 'postgres'
// });

const db = new Sequelize({
    host: 'localhost',
    port: 5432,
    database: 'hoami_forest',
    username: 'admin',
    password: 'admin',
    dialect: 'postgres',
})

module.exports = db;
