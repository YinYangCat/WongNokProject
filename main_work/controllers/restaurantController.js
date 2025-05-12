const pool = require('../db');

exports.getRestaurantDetail = async (req, res) => {
  const res_id = req.params.res_id;

  try {
    const restaurantQuery = `
      SELECT r.*, p.photourl AS image
      FROM restaurants r
      LEFT JOIN photo p ON r.respic = p.photoid
      WHERE r.res_id = $1
    `;
    const result = await pool.query(restaurantQuery, [res_id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Restaurant not found');
    }

    const reviewsQuery = `
      SELECT r.*, u.name, u.email, p.photourl AS avatar_url, u.email AS username
      FROM review r
      JOIN users u ON r.userid = u.userid
      LEFT JOIN photo p ON u.profilepic = p.photoid
      WHERE r.res_id = $1
      ORDER BY r.timestamp DESC
    `;
    const reviews = await pool.query(reviewsQuery, [res_id]);

    res.render('detail_res', {
      restaurant: result.rows[0],
      reviews: reviews.rows,
    });
  } catch (err) {
    console.error('Error fetching restaurant detail:', err);
    res.status(500).send('Server Error');
  }
};
