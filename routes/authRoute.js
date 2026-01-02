const express = require('express');
const { registerUser, loginUser, checkEmail, sendOtp } = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/check-email').post(checkEmail);
router.route('/send-otp').post(sendOtp);

module.exports = router;
