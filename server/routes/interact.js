const express = require('express');
const {
    getInteracts,
} = require('./../controllers_db/interactControllers');

const router = express.Router();

router.get('/trans_hash', getInteracts);

module.exports = router;