// routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireLogin = require('../middleware/authMiddleware'); // Use the existing auth middleware

// Show admin panel
router.get('/admin', requireLogin, async (req, res) => {
    try {
        // Check if the current user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).send('Forbidden: You are not an admin');
        }

        const result = await pool.query('SELECT * FROM restaurants ORDER BY name');
        const restaurants = result.rows;
        res.render('admin', { restaurants });
    } catch (err) {
        console.error('Error loading admin panel:', err);
        res.status(500).send('Server error');
    }
});

// Add new restaurant
router.post('/admin/add', requireLogin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden: You are not an admin');
    }

    const { res_id, name, phone_no, address, province, avg_rating, review_count, open_time, close_time } = req.body;

    try {
        await pool.query(
            'INSERT INTO restaurants (res_id, name, phone_no, address, province, avg_rating, review_count, open_time, close_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [res_id, name, phone_no, address, province, avg_rating, review_count, open_time, close_time]
        );
        res.redirect('/admin');
    } catch (err) {
        console.error('Error adding restaurant:', err);
        res.status(500).send('Server error');
    }
});



// Get restaurant details for editing
router.get('/admin/edit/:res_id', requireLogin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden: You are not an admin');
    }

    const res_id = req.params.res_id;

    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE res_id = $1', [res_id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Restaurant not found');
        }

        const restaurant = result.rows[0];
        res.render('editRestaurant', { restaurant });
    } catch (err) {
        console.error('Error fetching restaurant for editing:', err);
        res.status(500).send('Server error');
    }
});

// Update restaurant
router.post('/admin/edit/:res_id', requireLogin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden: You are not an admin');
    }

    const res_id = req.params.res_id;
    const { name, phone_no, address, province, avg_rating, review_count, open_time, close_time } = req.body;

    try {
        await pool.query(
            `UPDATE restaurants 
            SET name = $1, phone_no = $2, address = $3, province = $4, avg_rating = $5, review_count = $6, open_time = $7, close_time = $8 
            WHERE res_id = $9`,
            [name, phone_no, address, province, avg_rating, review_count, open_time, close_time, res_id]
        );
        res.redirect('/admin');
    } catch (err) {
        console.error('Error updating restaurant:', err);
        res.status(500).send('Server error');
    }
});


// Delete restaurant
router.post('/admin/delete/:res_id', requireLogin, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden: You are not an admin');
    }

    const { res_id } = req.params;
    try {
        await pool.query('DELETE FROM restaurants WHERE res_id = $1', [res_id]);
        res.redirect('/admin');
    } catch (err) {
        console.error('Error deleting restaurant:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
