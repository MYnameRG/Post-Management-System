const express = require('express');
const isAuth = require('../middleware/is-auth')
const { check } = require('express-validator/check');
const { getStatus, updateStatus } = require('../controllers/statusController');
const router = express.Router();

router.get('/:userId', isAuth, [
    check('status', 'Enter your status').not().isEmpty()
], getStatus);

router.put('/:userId', isAuth, [
    check('status', 'Enter your status').not().isEmpty()
], updateStatus);

module.exports = router;