// routes/restaurant.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// router.post('/submit', (req, res) => {
//   console.log('BODY:', req.body);
//   res.send('Received!');
// });
// Detail page

router.get('/restaurant/:id', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        // Fetch restaurant data
        const restaurantResult = await pool.query('SELECT * FROM restaurants WHERE id = $1', [restaurantId]);
        const restaurant = restaurantResult.rows[0];

        // Fetch reviews for this restaurant
        const reviewsResult = await pool.query(`
            SELECT r.rating, r.reviewtext AS comment, r.timestamp, u.name
            FROM review r
            JOIN users u ON r.userid = u.userid
            WHERE r.res_id = $1
            ORDER BY r.timestamp DESC
        `, [restaurantId]);

        const reviews = reviewsResult.rows;

        res.render('detail_res', { restaurant, reviews, user: req.user });
    } catch (err) {
        console.error('Error loading restaurant details:', err);
        res.status(500).send('Error loading restaurant details');
    }
});

router.post('/submit', async (req, res) => {
  const { res_id, reviewtext, rating } = req.body;
  const userId = req.session.user.userid; // Example if using sessions

  try {
    await pool.query(
      'INSERT INTO review (reviewid, userid, res_id, rating, reviewtext, timestamp) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)',
      ['r123', userId, res_id, rating, reviewtext]
    );

    res.redirect('/restaurants/detail/' + res_id);
  } catch (err) {
    console.error('Review insert error:', err);
    res.status(500).send('Failed to submit review');
  }
});


module.exports = router;
