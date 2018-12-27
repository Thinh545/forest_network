const express = require('express');
const {
    getNewfeeds,
    getTx,
    getAuthorTx,
} = require('./../controllers_db/transactionControllers');

const router = express.Router();

router.get('/newfeeds', getNewfeeds);
router.get('/tx', getTx);
router.get('/author_tx', getAuthorTx);

module.exports = router;