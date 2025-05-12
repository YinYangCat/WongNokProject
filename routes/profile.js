// routes/profile.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Profile page (GET)
router.get('/', requireLogin, async (req, res) => {
  res.render('profile', { user: req.user });
});

// Profile update (POST)
router.post('/update', requireLogin, upload.single('profilepic'), async (req, res) => {
  const userId = req.user.userid;
  const { name, password } = req.body;

  try {
    let hashedPassword = null;
    if (password) hashedPassword = await bcrypt.hash(password, 12);

    let photoId = null;
    if (req.file) {
      const photoResult = await pool.query('INSERT INTO photo (photourl) VALUES ($1) RETURNING photoid', [req.file.filename]);
      photoId = photoResult.rows[0].photoid;

      // Update user profile picture
      await pool.query('UPDATE users SET profilepic = $1 WHERE userid = $2', [photoId, userId]);
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

    if (updateFields.length > 0) {
      values.push(userId);
      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE userid = $${idx}`;
      await pool.query(query, values);
    }

    res.redirect('/profile');
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

