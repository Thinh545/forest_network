const express = require('express');
const {
    getPosts,
    getPostParams,
} = require('./../controllers_db/postControllers');

const router = express.Router();

router.get('/author', getPosts);
router.get('/post_params', getPostParams);

module.exports = router;