// const { checkLogInToken } = require('../utils/auth');
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/kakao-login', userController.signInKakao);
// router.get('/:userId', userController.);
// router.get('/', checkLogInToken, userController.getUserById);

module.exports = { router };