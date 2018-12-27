const express = require('express');
const {
    getAuthorPosts,
    getPost,
} = require('./../controllers_db/postControllers');

const router = express.Router();

router.get('/author', getAuthorPosts);
router.get('/detail', getPost);

module.exports = router;