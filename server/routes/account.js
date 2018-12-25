const express = require('express');
const {
  getInfo,
  getBalance,
  getNextSequence,
} = require('../controllers_db/accountControllers');

const router = express.Router();

router.get('/info', getInfo);
router.get('/balance', getBalance);
router.get('/next_sequence', getNextSequence);

module.exports = router;