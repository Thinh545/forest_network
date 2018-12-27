// Module
const _ = require('lodash');

// Models
const Account = require('./../lib/account')
const Post = require('./../lib/post')

module.exports = {
    getAuthorPosts: async (req, res) => {
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
    
    getPost: async (req, res) => {
        let data_return = {
            msg: 'Unexpected Error',
            data: {}
        }
        if (!req.query.tx_hash) {
            res.status(404);
            data_return.msg = "Invaild <tx_hash>"
        } else {
            const tx_hash = req.query.tx_hash;
            data_return.msg = "OK !";
            data_return.data = await Post.findByPk(tx_hash);
            res.status(200);
        }

        res.json(data_return);
    }
}