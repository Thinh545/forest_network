// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

// Models
const Account = require('./../lib/account')
const Info = require('./../lib/info')

// Configs
const {
    searchTransactionsURL,
    broadcastTxCommitURL
} = require('../configs/api');

const {
    BANDWIDTH_PERIOD,
    NETWORK_BANDWIDTH,
    MAX_CELLULOSE
} = require('./../configs/env');

// Lib
const v1 = require('./../lib/tx/v1');

// const transaction = require('./../lib/tx/index');
const transaction = require('./../lib/tx/index');

function calcuEnergy(acc) {
    const diff = acc.bandwidthTime
        ? moment(Date.now()).unix() - moment(acc.bandwidthTime).unix()
        : BANDWIDTH_PERIOD;


    const bandwidthLimit = acc.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
    // 24 hours window max 65kB
    bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * acc.bandwidth);
    return bandwidthLimit - bandwidth;
}

module.exports = {
    getInfo: async (req, res) => {
        const public_key = req.query.public_key;
        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                const found = await Info.findByPk(public_key);
                if (found) {
                    data_return.msg = 'OK';
                    data_return.data = {
                        name: found.name,
                        picture: found.picture,
                        followings: found.followings,
                    };
                    res.status(200);
                } else {
                    res.status(404);
                    data.msg = 'Account not found';
                }
            } catch (err) {
                res.status(500);
            }

        } else {
            res.status(400);
            data_return.msg = 'public_key must not empty !';
        }

        res.json(data_return);
    },

    getBalance: async (req, res) => {
        const public_key = req.query.public_key;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                const found = await Account.findByPk(public_key);
                if (found) {
                    res.status(200);
                    data_return.msg = 'OK';
                    data_return.data = {
                        balance: found.balance,
                        energy: calcuEnergy(found),
                    };
                }


            } catch (err) {
                res.status(500);
            }

        } else {
            res.status(400);
            data_return.msg = 'public_key must not empty !';
        }

        res.json(data_return);
    },

    getCreateParams: async (req, res) => {
        const account = req.query.account;
        const address = req.query.address;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'Invalid <account> string !'
        } else if (_.isEmpty(address) || !_.isString(address)) {
            res.status(400)
            data_return.msg = 'Invalid <address> string !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                const tx = {
                    version: 1,
                    account: account,
                    sequence: found.sequence + 1,
                    memo: Buffer.from('Create account').toString('base64'),
                    operation: 'create_account',
                    params: {
                        address: address
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

        res.json(data_return);
    },

    postCreateCommit: async (req, res) => {
        let tx = req.body.tx;

        let data_return = {
            msg: 'Unexpected Error',
        }
        res.status(500);

        if (_.isEmpty(tx)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'tx is empty !'
        } else {
            tx.memo = Buffer.from(tx.memo, 'base64');
            tx.signature = Buffer.from(tx.signature, 'base64');

            const txData = '0x' + transaction.encode(tx).toString('hex');
            BlockSync.commitTransaction(txData);

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
        }

        res.json(data_return);
    },

    getPaymenParams: async (req, res) => {
        const account = req.query.account;
        const address = req.query.public_key;
        const amount = req.query.amount;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'account must be a string and not empty !'
        } else if (_.isEmpty(address) || !_.isString(address)) {
            res.status(400)
            data_return.msg = 'public_key must be a string and not empty !'
        } else if (!_.isNumber(amount) || _.isNaN(amount) || _.isNull(amount)) {
            res.status(400)
            data_return.msg = 'amount must be a number and > 0 !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                const tx = {
                    version: 1,
                    account: account,
                    sequence: found.sequence + 1,
                    memo: Buffer.from('Payment'),
                    operation: 'payment',
                    params: {
                        address: address,
                        amount: amount
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

        res.json(data_return);
    },

    getUpdateParams: async (req, res) => {
        const account = req.query.account;
        const key = req.query.account;
        const value = req.query.value;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.msg = 'Invalid <account> string !'
        } else if (_.isEmpty(key) || !_.isString(key)) {
            res.status(400)
            data_return.msg = 'Invalid <key> string !'
        } else if (_.isEmpty(value) || !_.isString(value)) {
            res.status(400)
            data_return.msg = 'Invalid <value> string !'
        } else {
            const found = await Account.findByPk(account);
            if (found) {
                const tx = {
                    version: 1,
                    account: account,
                    sequence: found.sequence + 1,
                    memo: Buffer.from('Update account').toString('base64'),
                    operation: 'update_account',
                    params: {
                        key,
                        value,
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

        res.json(data_return);
    }
}