const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

// // Configs
const db = require('./lib/db')
const BlockSync = require('./lib/sync')
const Account = require('./lib/account')
// const {
//     mongoURI
// } = require('./configs/db');

// Routes
const accountRouter = require('./routes/account');
const postRouter = require('./routes/post');
const interactRouter = require('./routes/interact');
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/account', accountRouter);
app.use('/post', postRouter);
app.use('/interact', interactRouter);

let server;
db.sync().then(async () => {
    console.log('Database schema synced!');

    // Try to init genesis account
    const genesis = await Account.findByPk('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');
    if (!genesis) {
        await Account.create({
            address: 'GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7',
            balance: Number.MAX_SAFE_INTEGER,
            sequence: 0,
            bandwidth: 0,
        });
    }

    BlockSync.sync();

    server = app.listen(process.env.PORT || 5000, function () {
        var port = server.address().port;
        console.log("Express is working on port " + port);
    });

module.exports = app;
