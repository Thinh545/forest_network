const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config()

// Configs
const {
    mongoURI
} = require('./configs/db');

// Routes
const accountRouter = require('./routes/account');

const app = express();

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

module.exports = app;
