const express = require('express');
const {
    getInteracts,
    getAuthorInteracts
} = require('./../controllers_db/interactControllers');

const router = express.Router();

router.get('/trans_hash', getInteracts);
router.get('/author', getAuthorInteracts);

module.exports = router;