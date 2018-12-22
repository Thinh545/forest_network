// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const account = require('./../lib/account')
const db = require('./../lib/db');

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

const server = require('./../lib/server');

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

                // // Tính năng lượng
                // let account_bandwidth = amount * system_bandwidth / max_cel - used_bandwidth;
                // let used_bandwidth = current_bandwidth * MAX(0, (period - t)/(period));

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
                const checkTransaction = await db.transaction();
                await account.create({
                    address: public_key,
                    balance: 0,
                    sequence: 0,
                    bandwidth: 0,
                }, { transaction: checkTransaction })
                checkTransaction.rollback();

                let balance_info = {
                    address: public_key,
                    balance: 0,
                    bandwidth: 0,
                }

                const url = searchTransactions + '\'' + public_key + '\'"';
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
    }
}