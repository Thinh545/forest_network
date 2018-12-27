const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

// Configs
const db = require('./lib/db')
const BlockSync = require('./lib/sync')
const Account = require('./lib/account')
const WebSocket = require('ws')
const socket = new WebSocket('ws://0.0.0.0:26657/websocket')

// Routes
const accountRouter = require('./routes/account');
const postRouter = require('./routes/post');
const interactRouter = require('./routes/interact');
const transactionRouter = require('./routes/transaction')
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
app.use('/transaction', transactionRouter);

const server = app.listen(process.env.port || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

socket.on('open', () => {
    db.sync().then(async () => {
        console.log('Database schema synced!');
        // Try to init genesis account
        // genesis
        // const genesis = await Account.findByPk('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');
        const count = await Account.count();
        if (count === 0) {
            await Account.create({
                address: "GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7",
                balance: Number.MAX_SAFE_INTEGER,
                sequence: 0,
                bandwidth: 0,
            });
        }

        await BlockSync.sync();
    });
    socket.send(JSON.stringify({ "method": "subscribe", "params": { "query": "tm.event='NewBlock'" } }));
})
socket.on('message', async (res) => {
    const something = JSON.parse(res);
    try {
        await BlockSync.commitBlock(something.result.data.value.block);
    } catch (err) {
        console.log(err);
    }
})

module.exports = app;
