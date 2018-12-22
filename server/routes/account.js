const express = require('express');
const {
  getInfo,
  getSequence,
  getBalance
} = require('../controllers/accountControllers');

const router = express.Router();

router.get('/info', getInfo);
router.get('/balance', getBalance);
module.exports = router;
