const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// const authController = require('../controller/blogController');


router.post('/Signup', authController.Signup);
router.post('/Login', authController.Login);

module.exports = router;
