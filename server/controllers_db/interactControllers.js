// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

// Models
const Account = require('./../lib/account');
const Transactions = require('./../lib/transaction');
const Interact = require('./../lib/interact');

// Configs
const {
    searchTransactions
} = require('../configs/api');

const {
    NETWORK_BANDWIDTH,
    MAX_CELLULOSE
} = require('./../configs/env');

module.exports = {
    getInteracts: async (req, res) => {
        const tx_hash = req.query.tx_hash;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(tx_hash) || !_.isString(tx_hash)) {
            res.status(400)
            data_return.msg = 'Invalid <tx_hash> string !'
        } else {
            const found = Transactions.findByPk(tx_hash);
            if (found) {
                res.status(200);
                data_return.msg = 'OK !';
                data_return.data = await Interact.findAll({
                    where: {
                        hash: tx_hash
                    },
                    raw: true,
                })
            }
        }

        res.json(data_return);
    },

    getInteractParams: async (req, res) => {
        const account = req.query.account;
        const object = req.query.object;
        const content = req.query.content;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'Invalid <account> string !'
        } else if (_.isEmpty(object) || !_.isString(object)) {
            res.status(400);
            data_return.msg = 'Invalid <object> string !'
        } else if (_.isEmpty(content) || !_.isString(content)) {
            res.status(400);
            data_return.msg = 'Invalid <content> string !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                const tx = {
                    version: 1,
                    account: account,
                    sequence: parseInt(found.sequence) + 1,
                    memo: Buffer.from('Interact'),
                    operation: 'interact',
                    params: {
                        object,
                        content
                    },
                }

                res.status(200);
                data_return.msg = 'OK !';
                data_return.data = tx;
            }
        }

        res.json(data_return);
    },
}