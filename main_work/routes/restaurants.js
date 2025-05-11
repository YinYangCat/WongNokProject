const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust path if needed


// More specific route first
router.get('/detail/:id', async (req, res) => {
  const restaurantId = req.params.id;
  console.log('Requested detail for restaurantId:', restaurantId);
  try {
    const restaurantResult = await pool.query(
      'SELECT * FROM restaurants WHERE res_id = $1',
      [restaurantId]
    );
    if (restaurantResult.rows.length === 0) {
      return res.status(404).send('Restaurant not found');
    }

    const restaurant = restaurantResult.rows[0];

    const reviewsResult = await pool.query(`
      SELECT r.reviewtext, r.rating, r.timestamp,
             u.name AS username,
             p.photourl AS avatar_url
      FROM review r
      JOIN users u ON r.userid = u.userid
      LEFT JOIN photo p ON u.profilepic = p.photoid
      WHERE r.res_id = $1
      ORDER BY r.timestamp DESC
    `, [restaurantId]);

    const reviews = reviewsResult.rows;

    res.render('detail_res', { restaurant, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Then generic one LAST
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY name');
    const restaurants = result.rows;

    res.render('main', { restaurants });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
