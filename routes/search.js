const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust path if needed

router.get('/search', async (req, res) => {
  const { name, province } = req.query;

  let baseQuery = 'SELECT * FROM restaurants';
  const values = [];
  const conditions = [];

  if (name) {
    values.push(`%${name}%`);
    conditions.push(`LOWER(name) LIKE LOWER($${values.length})`);
  }

  if (province) {
    values.push(`%${province}%`);
    conditions.push(`LOWER(province) LIKE LOWER($${values.length})`);
  }

  if (conditions.length > 0) {
    baseQuery += ' WHERE ' + conditions.join(' AND ');
  }

  baseQuery += ' ORDER BY avg_rating DESC LIMIT 30'; // optional sorting/limit

  try {
    const result = await pool.query(baseQuery, values);
    const searchResults = result.rows;

    res.render('search', {
      restaurants: searchResults,
      user: req.user || req.session?.user,  // fallback
      query: req.query  // this helps preserve form values
    });
  } catch (err) {
    console.error('Search query error:', err);
    res.status(500).send('Server error during search');
  }
});

module.exports = router;