const express = require('express');
const { check } = require('express-validator/check')
const { postLogin, postSignUp } = require('../controllers/authController');
const router = express.Router();

router.post('/login', [
    check('email', 'Please enter your valid email address').isEmail(),
    check('password', 'Please enter your password of minimum 5 characters').trim().isLength({ min: 5 })
], postLogin);

router.post('/signup', [
    check('name', 'Please enter your name').not().isEmpty().isAlpha(),
    check('email', 'Please enter your valid email address').isEmail(),
    check('password', 'Please enter your password of minimum 5 characters').trim().isLength({ min: 5 })
], postSignUp);

module.exports = router;