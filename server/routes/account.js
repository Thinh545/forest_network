const express = require('express');
const {
  getInfo,
  getBalance,
  getSequence,
  getCreateParams,
  postCreateCommit
} = require('../controllers/accountControllers');

const router = express.Router();

router.get('/info', getInfo);
router.get('/balance', getBalance);
router.get('/create_params', getCreateParams);
router.post('/create_commit', postCreateCommit);
module.exports = router;
