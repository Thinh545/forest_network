// Module
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Models
const Transactions = require('./../lib/transaction');

module.exports = {
    getNewfeeds: async (req, res) => {
        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }
        try {
            if (!_.isNull(req.query.per_page)) {
                const id = req.query.id ? parseInt(req.query.id) : (await Transactions.count());
                const per_page = req.query.per_page ? parseInt(req.query.per_page) : 20;
                data_return.data = await Transactions.findAll({
                    where: {
                        id: {
                            [Op.lte]: id,
                        },
                        operation: {
                            [Op.ne]: 'interact'
                        }
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    limit: per_page,
                    raw: true
                })
                data_return.msg = 'OK !';
                res.status(200)
            }
        } catch (err) {
            res.status(500);
            data_return.msg = err;
        }

        res.json(data_return);
    },

    getTx: async (req, res) => {
        const hash = req.query.hash;
        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }

        try {
            if (!_.isEmpty(hash)) {
                data.msg = "OK !";
                data_return.data = await Transactions.find({
                    where: {
                        hash: hash,
                    },
                    raw: true,
                })
                res.status(200);
            } else {
                data_return.msg = "Invail <hash>";
                res.status(400);
            }
        } catch (err) { console.log(err) }
        res.json(data_return);
    },

    getAuthorTx: async (req, res) => {
        const public_key = req.query.public_key;
        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }
        try {
            if (!_.isEmpty(public_key)) {
                const id = req.query.id ? parseInt(req.query.id) : parseInt(await Transactions.count());
                const per_page = req.query.per_page ? parseInt(req.query.per_page) : Number.MAX_SAFE_INTEGER;
                data_return.msg = "OK !";
                data_return.data = await Transactions.findAll({
                    where: {
                        id: {
                            [Op.lte]: id,
                        },
                        author: public_key,
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    limit: per_page,
                    raw: true
                })
                res.status(200);
            } else {
                data_return.msg = "Invail <public_key>";
                res.status(400);
            }
        } catch (err) {
            console.log(err);
        }
        res.json(data_return);
    }
}