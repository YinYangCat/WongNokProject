// routes/restaurant.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireLogin = require('../middleware/authMiddleware');

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

        res.render('detail_res', { restaurant, reviews, user: req.user });
    } catch (err) {
        console.error('Error loading restaurant details:', err);
        res.status(500).send('Error loading restaurant details');
    }
});

router.post('/submit', requireLogin, async (req, res) => {
    console.log('Submitting review as user:', req.user);

    const userId = req.user.userid; // Example if using sessions
    const { res_id, reviewtext, rating } = req.body;
    console.log('Submitting review with:', { userId, res_id, rating, reviewtext });
    try {
    await pool.query(
        'INSERT INTO review (userid, res_id, rating, reviewtext, timestamp) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
        [userId, res_id, rating, reviewtext]
    );

    res.redirect('/restaurants/detail/' + res_id);
    } catch (err) {
        console.error('Review insert error:', err);
        res.status(500).send('Failed to submit review');
    }
    });


module.exports = router;