const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);//Register rount
router.post('/login', authController.login);//Login rount
router.get('/main', (req, res) => {
  res.render('main'); // This looks for views/main.ejs
});

module.exports = router;
