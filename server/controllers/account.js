// Module
const axios = require('axios');

// Configs
const {
    searchTransactions
} = require('./../configs/api');

// Lib
const v1 = require('./../lib/tx/v1');

module.exports = {
    getAmount: async (req, res) => {
        const public_key = req.params.public_key;
        const url = searchTransactions + '\'' + public_key + '\'"';
        const data_request = await axios.default.get(url);

        const txs = data_request.data.result.txs;

        let amount = 0;
        // let payment = [];
        txs.forEach((trans, index) => {
            let buf = Buffer.from(trans.tx, 'base64');
            let data_trans = v1.decode(buf);

            if (data_trans.operation == 'payment') {
                // payment.push(data_trans);
                amount += data_trans.params.amount;
                // console.log(data_trans);
            }

        });

        // let buf = Buffer.from(txs[0].tx, 'base64');
        // let data_trans = v1.decode(buf);
        // // let memo = v1.decode(data_trans.memo);
        // // console.log(data_trans.memo.toString())
        // console.log(JSON.parse(data_trans.signature.toString()));
        res.json({
            amount: amount
        });
    }
}