const express = require('express');
const {
    getInteracts,
    getInteractParams,
} = require('./../controllers_db/interactControllers');

const router = express.Router();

router.get('/trans_hash', getInteracts);
router.get('/params', getInteractParams);

module.exports = router;