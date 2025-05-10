const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path if needed

router.get('/restaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY name');
    const restaurants = result.rows;

    res.render('main', { restaurants }); // Pass restaurants to main.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
