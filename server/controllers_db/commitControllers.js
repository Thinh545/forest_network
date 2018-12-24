const BlockSync = require('./../lib/sync')

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
            BlockSync.commitTransaction(txData);

            res.status(200);
            data_return.status = 200;
            data_return.msg = 'OK !';
        }

        res.json(data_return);
    },
}