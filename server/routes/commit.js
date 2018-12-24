const express = require('express');
const {
    postTransaction,
} = require('./../controllers_db/commitControllers')

const router = express.Router();

router.post('/transaction', postTransaction);

module.exports = router;