const express = require('express');
const {
  getAmount
} = require('../controllers/account');
const router = express.Router();

router.get('/:public_key/amount', getAmount);

module.exports = router;
