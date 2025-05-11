const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const pool = require('../db');


//Register rount
router.post('/register', upload.single('profile-picture'), authController.register);

router.post('/login', authController.login);//Login rount
//Protect /main route with middleware
router.get('/main', requireLogin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY avg_rating DESC LIMIT 3');
    const topRestaurants = result.rows;
    const allRes = await pool.query('SELECT * FROM restaurants'); // add this if needed

    res.render('main', {
      topRestaurants,
      restaurants: allRes.rows,
      user: req.user // if you passed it from authMiddleware
    });
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
