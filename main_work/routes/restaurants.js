const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust path if needed

// Insert a review
router.post('/submit', async (req, res) => {
    if (!req.session.user || !req.session.user.userid) {
        return res.status(401).send('You must be logged in to submit a review');
    }

    const userId = req.session.user.userid;
    const { res_id, reviewtext, rating } = req.body;

    try {
        await pool.query(
            'INSERT INTO review (userid, res_id, rating, reviewtext, timestamp) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
            [userId, res_id, rating, reviewtext]
        );

        res.redirect('/restaurants/detail/' + res_id);
    } catch (err) {
        console.error('Review insert error:', err);
        res.status(500).send('Server error');
    }
});


module.exports = router;

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
