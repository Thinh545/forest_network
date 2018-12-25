// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const crypto = require('crypto');

const account = require('./../lib/account')
const db = require('./../lib/db');

// Models
const accountModel = require('./../models/accountModel');

// Configs
const {
    searchTransactionsURL,
    broadcastTxCommitURL
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

        console.log(public_key);
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

                const url = searchTransactionsURL + '\'' + public_key + '\'"';
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

                const url = searchTransactionsURL + '\'' + public_key + '\'"';
                const data_request = await axios.default.get(url);

                const txs = data_request.data.result.txs;

                txs.forEach(async (trans, index) => {
                    let buf = Buffer.from(trans.tx, 'base64');
                    let errors = await server.checkTx({ tx: buf });
                    console.log(errors)
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

    getCreateParams: async (req, res) => {
        const account = req.query.account;
        const address = req.query.address;

        const url = searchTransactionsURL + '\'' + account + '\'"';
        const data_request = await axios.default.get(url);

        const txs = data_request.data.result.txs;
        let sequence = 0;
        txs.forEach(async (trans, index) => {
            let buf = Buffer.from(trans.tx, 'base64');
            let data_trans = v1.decode(buf);

            if (data_trans.account == account) {
                sequence++
            }
        });

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'Invalid <account> string !'
        } else if(_.isEmpty(address) || !_.isString(address)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'Invalid <address> string !'
        } else {
            const tx = {
                version: 1,
                account : account,
                sequence: sequence,
                memo: Buffer.from('Create account').toString('base64'),
                operation: 'create_account',
                params: {
                    address: address
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
        let tx = req.body.tx;

        let data_return = {
            status: 500,
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
            const url = broadcastTxCommitURL + txData;
            const commit_create_account = await axios.default.get(broadcastTxCommitURL)

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
        }

        res.json(data_return);
    },

    getPaymenParams: (req, res) => {
        const account = req.query.account;
        const public_key = req.query.public_key;
        const amount = req.query.amount;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(account) || !_.isString(account)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'account must be a string and not empty !'
        } else if(_.isEmpty(public_key) || !_.isString(public_key)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'public_key must be a string and not empty !'
        } else if(!_.isNumber(amount) || _.isNaN(amount) || _.isNull(amount)) {
            res.status(400)
            data_return.status = 400;
            data_return.msg = 'amount must be a number and > 0 !'
        }
        else {
            const tx = {
                version: 1,
                account : account,
                sequence: 1,
                memo: Buffer.from('Create account'),
                operation: 'create_account',
                params: {
                    address: public_key,
                    amount: amount
                },
            }

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
            data_return.data = tx;
        }

        res.json(data_return);
    }
}