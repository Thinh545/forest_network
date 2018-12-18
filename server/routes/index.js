const express = require('express');
const {
  getTransactionInfo
} = require('./../controllers/index');
const router = express.Router();

router.get('/', getTransactionInfo);

module.exports = router;
