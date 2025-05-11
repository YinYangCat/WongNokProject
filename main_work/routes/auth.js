const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/authMiddleware');
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

router.post('/register', authController.register);//Register rount
router.post('/login', authController.login);//Login rount
//Protect /main route with middleware
router.get('/main', requireLogin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY avg_rating DESC LIMIT 6');
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

// Configure multer storage
const storage = multer.diskStorage({
destination: path.join(__dirname, '../public/uploads'),
filename: (req, file, cb) => {
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
}
});

const upload = multer({ storage });


router.post('/profile/update', requireLogin, upload.single('profilepic'), async (req, res) => {
const userId = req.session.userId;
const { name, password } = req.body;

try {
let hashedPassword = null;
if (password) {
hashedPassword = await bcrypt.hash(password, 12);
}

// Handle uploaded profile picture
let photoId = null;
if (req.file) {
  const photoResult = await pool.query(
    'INSERT INTO photo (photourl) VALUES ($1) RETURNING photoid',
    [req.file.filename]
  );
  photoId = photoResult.rows[0].photoid;
}

const updateFields = [];
const values = [];
let idx = 1;

if (name) {
  updateFields.push(`name = $${idx++}`);
  values.push(name);
}

if (hashedPassword) {
  updateFields.push(`password = $${idx++}`);
  values.push(hashedPassword);
}

if (photoId) {
  updateFields.push(`profilepic = $${idx++}`);
  values.push(photoId);
}

if (updateFields.length === 0) {
  return res.redirect('/profile'); // nothing to update
}

values.push(userId); // final WHERE value
const query = `UPDATE users SET ${updateFields.join(', ')} WHERE userid = $${idx}`;
await pool.query(query, values);

res.redirect('/profile');
} catch (err) {
console.error('Error updating profile:', err);
res.status(500).send('Server error');
}
});

module.exports = router;
