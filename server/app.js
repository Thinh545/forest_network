const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

// Configs
const {
    mongoURI
} = require('./configs/db');

// Routes
const accountRouter = require('./routes/account');

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
        console.log("Failed to connect DB !");
        console.log("Error: ", err);
    });

app.use('/account', accountRouter);

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});

module.exports = app;
