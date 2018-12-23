// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

const account = require('./../lib/account')

// Models
const accountModel = require('./../models/accountModel');

// Configs
const {
    searchTransactions
} = require('../configs/api');

const {
    NETWORK_BANDWIDTH,
    MAX_CELLULOSE
} = require('./../configs/env');

// Lib
const v1 = require('./../lib/tx/v1');

module.exports = {
    getInteractParams: (req, res) => {
        const account = req.query.account;
        const public_key = req.query.public_key;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'Invalid <account> string !'
        } else if(_.isEmpty(public_key) || !_.isString(public_key)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'Invalid <public_key> string !'
        } else {
            const tx = {
                version: 1,
                account : account,
                sequence: 1,
                memo: Buffer.from('Create account'),
                operation: 'create_account',
                params: {
                    address: public_key
                },
            }

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
            data_return.data = tx;
        }

        res.json(data_return);
    },

    postInteract: async (req, res) => {

    }
}