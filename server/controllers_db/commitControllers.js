const BlockSync = require('./../lib/sync')
const _ = require('lodash');
const axios = require('axios');

// Lib
const v1 = require('./../lib/tx/v1');

// const transaction = require('./../lib/tx/index');
const transaction = require('./../lib/tx/index');

const {
    broadcastTxCommitURL
} = require('../configs/api');

module.exports = {
    postTransaction: async (req, res) => {
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
            const url = broadcastTxCommitURL + txData;
            const commit_create_account = await axios.default.get(url)

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
        }

        res.json(data_return);
    },
}