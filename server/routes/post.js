const express = require('express');
const {
    getPosts,
} = require('./../controllers_db/postControllers');

const router = express.Router();

router.get('/author', getPosts);

module.exports = router;