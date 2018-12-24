const express = require('express');
const {
  getInfo,
  getBalance,
  getCreateParams,
  postCreateCommit,
  getPaymenParams,
  getUpdateParams
} = require('../controllers_db/accountControllers');

const router = express.Router();

router.get('/info', getInfo);
router.get('/balance', getBalance);
router.get('/create_params', getCreateParams);
router.get('/create_commit', postCreateCommit);
router.get('/payment_params', getPaymenParams)
router.get('/update_params', getUpdateParams);

module.exports = router;