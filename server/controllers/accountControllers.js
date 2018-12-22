// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');
const { Keypair, sign } = require('stellar-base');
const key = Keypair.random();

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
// const transaction = require('./../lib/tx/index');
const transaction = require('./../lib/tx/index');

module.exports = {
    getInfo: async (req, res) => {
        const public_key = req.query.public_key;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                let account = {
                    address: public_key,
                    balance: 0,
                    sequence: 0,
                    bandwidth: 0,
                    bandwidthTime: null,
                }

                const url = searchTransactions + '\'' + public_key + '\'"';
                const data_request = await axios.default.get(url);

                const txs = data_request.data.result.txs;

                txs.forEach((trans, index) => {
                    let buf = Buffer.from(trans.tx, 'base64');
                    let data_trans = v1.decode(buf);

                    console.log(data_trans);

                    if (data_trans.operation == 'payment') {
                        if (data_trans.account === public_key) {
                            account.balance -= data_trans.params.amount;
                        } else {
                            account.balance += data_trans.params.amount;
                        }
                    }

                    if (data_trans.account == public_key) {
                        account.sequence = data_trans.sequence;
                    }
                });

                res.status(200);
                data_return.status = 200;
                data_return.msg = 'OK';
                data_return.data = account;
            } catch (err) {
                res.status(500);
            }

        } else {
            res.status(400);
            data_return.status = 400;
            data_return.msg = 'public_key must not empty !';
        }

        res.json(data_return);
    },

    getBalance: async (req, res) => {
        const public_key = req.query.public_key;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                let balance_info = {
                    address: public_key,
                    balance: 0,
                    bandwidth: 0,
                }

                const url = searchTransactions + '\'' + public_key + '\'"';
                const data_request = await axios.default.get(url);

                const txs = data_request.data.result.txs;

                txs.forEach((trans, index) => {
                    let buf = Buffer.from(trans.tx, 'base64');
                    let data_trans = v1.decode(buf);

                    if (data_trans.operation == 'payment') {
                        if (data_trans.account === public_key) {
                            balance_info.balance -= data_trans.params.amount;
                        } else {
                            balance_info.balance += data_trans.params.amount;
                        }
                    }
                });

                balance_info.bandwidth = balance_info.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;

                res.status(200);
                data_return.status = 200;
                data_return.msg = 'OK';
                data_return.data = balance_info;
            } catch (err) {
                res.status(500);
            }

        } else {
            res.status(400);
            data_return.status = 400;
            data_return.msg = 'public_key must not empty !';
        }

        res.json(data_return);
    },

    // createAccount: (req, res) => {
    //     // const tx = req.body.tx;
    //     // console.log(tx);
    //     let tx = {
    //         version: 1,
    //         account : 'GDQVHLWFQW3M6H23J2IMRMBK4MHZ5ZF56LJWN7WNXPAMRTL5MQPVCPKL',
    //         sequence: 1,
    //         memo: Buffer.from('Test create account'),
    //         operation: 'create_account',
    //         params: {
    //             address: 'GDCRVBWSBCUP74I7FWXBIX56QCXTDAKD4CZQDBUTM7CKYAI2BOGSYUAP'
    //         },
    //     }

    //     // const data = transaction.encode(tx);
    //     // const data = transaction.encode(tx).toString('hex');
    //     // const unsignedHash = crypto
    //     // .createHash('sha256')
    //     // .update(data)
    //     // .digest();
    //     transaction.sign(tx, 'SCRC7SUP5WKJLEFWCUSBBLJ7RI2TCDLA5O6Q4BWBFW2M57JNTCVN3LIO')
    //     const data = '0x' + transaction.encode(tx).toString('hex');

    //     // const commit = axios.default.post()
    //     console.log(data);
    //     res.send(data);
    // },

    getCreateParams: (req, res) => {
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

    postCreateCommit: async (req, res) => {
        const tx = req.body.tx;
        res.send(tx);
    }
}