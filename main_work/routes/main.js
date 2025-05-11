const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust to your PG config

router.get('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM restaurants WHERE res_id = $1', [restaurantId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Restaurant not found');
    }

    const restaurant = result.rows[0];
    res.render('detail_res', { restaurant }); // you must have a detail.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;