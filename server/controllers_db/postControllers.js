// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

// Models
const Account = require('./../lib/account')
const Post = require('./../lib/post')

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
    getPosts: async (req, res) => {
        const account = req.query.account;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'Invalid <account> string !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                res.status(200);
                data_return.msg = 'OK !';
                data_return.data = await Post.findAll({ where: { author: account }, raw: true });
            } else {
                res.status(404);
                data_return.msg = 'Account not found';
            }
        }

        res.json(data_return);
    },

    getPostParams: async (req, res) => {
        const account = req.query.account;
        const content = req.query.content;
        const keys = req.query.keys;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'Invalid <account> string !'
        } else if (_.isEmpty(keys) || !_.isString(keys)) {
            res.status(400)
            data_return.msg = 'Invalid <keys> string !'
        } else if (_.isEmpty(content) || !_.isString(content)) {
            res.status(400)
            data_return.msg = 'Invalid <content> string !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                const tx = {
                    version: 1,
                    account: account,
                    sequence: parseInt(found.sequence) + 1,
                    memo: Buffer.from('Post').toString('base64'),
                    operation: 'post',
                    params: {
                        content,
                        keys,
                    },
                }

                res.status(200);
                data_return.msg = 'OK !';
                data_return.data = tx;
            } else {
                res.status(404);
                data_return.msg = 'Account not found';
            }
        }

        res.json(data_return)
    }
}