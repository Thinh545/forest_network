const express = require('express');
const {
  getInfo,
  getSequence
} = require('../controllers/accountControllers');

const router = express.Router();

router.get('/:public_key/info', getInfo);
router.get('/:public_key/sequence', getSequence);

module.exports = router;
