// Module
const _ = require('lodash');

// Models
const Transactions = require('./../lib/transaction');
const Interact = require('./../lib/interact');

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
    getAuthorInteracts: async (req, res) => {
        const public_key = req.query.public_key;

        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        if (_.isEmpty(public_key) || !_.isString(public_key)) {
            res.status(400)
            data_return.msg = 'Invalid <public_key> string !'
        } else {
            const found = await Interact.findAll({
                where: { author: public_key, },
                raw: true,
            })
            if (found) {
                res.status(200);
                data_return.msg = 'OK !';
                data_return.data = found
            }
        }

        res.json(data_return);
    },
}