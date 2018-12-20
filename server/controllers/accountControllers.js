// Module
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

// Models
const accountModel = require('./../models/accountModel');

// Configs
const {
    searchTransactions
} = require('../configs/api');

// const {
//     NETWORK_BANDWIDTH
// } = require('./../configs/env');

// Lib
const v1 = require('../lib/tx/v1');



module.exports = {
    getInfo: async (req, res) => {
        const public_key = req.params.public_key;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                const url = searchTransactions + '\'' + public_key + '\'"';
                const data_request = await axios.default.get(url);

                const txs = data_request.data.result.txs;
                let amount = 0; // Số dư 
                let sequence = 0; // Biến đếm thứ tự giao dịch
                let account = '';
                let address = '';

                txs.forEach((trans, index) => {
                    let buf = Buffer.from(trans.tx, 'base64');
                    let data_trans = v1.decode(buf);

                    if (data_trans.operation == 'payment') {
                        account = data_trans.account;
                        address = data_trans.params.address;

                        if (account === public_key) {
                            amount -= data_trans.params.amount;
                        } else {
                            amount += data_trans.params.amount;
                        }
                    }

                    if (data_trans.account == public_key) {
                        ++sequence;
                    }
                });

                // // Tính năng lượng
                // let account_bandwidth = amount * system_bandwidth / max_cel - used_bandwidth;
                // let used_bandwidth = current_bandwidth * MAX(0, (period - t)/(period));

                res.status(200);
                data_return.status = 200;
                data_return.msg = 'OK';
                data_return.data = {
                    amount: amount,
                    sequence: sequence,
                    bandwidth: 0
                }
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

    getSequence: async (req, res) => {
        const public_key = req.params.public_key;

        let data_return = {
            status: 500,
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                const url = searchTransactions + '\'' + public_key + '\'"';
                const data_request = await axios.default.get(url);

                const txs = data_request.data.result.txs;

                let sequence = 0;

                txs.forEach((trans, index) => {
                    let buf = Buffer.from(trans.tx, 'base64');
                    let data_trans = v1.decode(buf);

                    console.log(data_trans.account);
                    if (data_trans.account == public_key) {
                        ++sequence;
                    }
                });

                res.status(200);
                data_return.status = 200;
                data_return.msg = 'OK';
                data_return.data = {
                    sequence: sequence
                }

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