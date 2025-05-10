const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/authMiddleware');
const pool = require('../db');

router.post('/register', authController.register);//Register rount
router.post('/login', authController.login);//Login rount
//Protect /main route with middleware
router.get('/main', requireLogin, (req, res) => {
  res.render('main');
});

module.exports = router;
