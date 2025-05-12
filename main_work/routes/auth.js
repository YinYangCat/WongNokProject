const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');

// Register (MUST use upload middleware)
router.post('/register', upload.single('profile-picture'), authController.register);

// Login
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
  if (err) {
    console.error('Logout error:', err);
    return res.status(500).send('Logout failed');
  }
    res.redirect('/auth/login');
  });
});
module.exports = router;
