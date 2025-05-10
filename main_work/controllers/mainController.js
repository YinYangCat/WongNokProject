const pool = require('../db'); // adjust path if needed

module.exports = async (req, res) => {
  try {
    const allRestaurants = await pool.query('SELECT * FROM restaurants');
    const topRestaurants = await pool.query(
      'SELECT * FROM restaurants ORDER BY avg_rating DESC LIMIT 3'
    );

    res.render('main', {
      restaurants: allRestaurants.rows,
      topRestaurants: topRestaurants.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
