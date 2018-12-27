// Module
const _ = require('lodash');
const moment = require('moment');
const Decimal = require('decimal.js');

// Models
const Account = require('./../lib/account')
const Info = require('./../lib/info')

const {
    BANDWIDTH_PERIOD,
    NETWORK_BANDWIDTH,
    MAX_CELLULOSE
} = require('./../configs/env');

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
                    data_return.data = found;
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
                        sequence: found.sequence,
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

    getNextSequence: async (req, res) => {
        const public_key = req.query.public_key;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (!_.isEmpty(public_key)) {
            try {
                const found = await Account.findByPk(public_key);
                if (found) {
                    const nextSequence = new Decimal(found.sequence).add(1);
                    res.status(200);
                    data_return.msg = 'OK';
                    data_return.data = {
                        nextSequence,
                    };
                } else {
                    data_return.msg = "not found account";
                    res.status(404);
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
}