const express = require('express');
const isAuth = require('../middleware/is-auth')
const { check } = require('express-validator/check');
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.get('/', isAuth, getPosts);

router.get('/:postId',  isAuth, getPost);

router.post('/create',  isAuth, [
    check('title', 'Please enter the title').not().isEmpty(),
    check('image', 'Please enter the image URL').not().isEmpty().isURL(),
    check('content', 'Please enter the content ').not().isEmpty(),
], createPost);

router.put('/:postId', isAuth, [
    check('title', 'Please enter the title').not().isEmpty(),
    check('image', 'Please enter the image URL ').not().isEmpty().isURL(),
    check('content', 'Please enter the content ').not().isEmpty(),
], updatePost);

router.delete('/:postId', isAuth, deletePost);

module.exports = router;