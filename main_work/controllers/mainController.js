const pool = require('../db'); // adjust path if needed

module.exports = async (req, res) => {
  try {
    const allRestaurants = await pool.query(`
  SELECT r.*, p.photourl
  FROM restaurants r
  LEFT JOIN photo p ON r.respic = p.photoid
`);

const topRestaurants = await pool.query(`
  SELECT r.*, p.photourl, (r.avg_rating * 0.7 + LOG(1 + r.review_count) * 0.3) AS score 
  FROM restaurants r
  LEFT JOIN photo p ON r.respic = p.photoid
  ORDER BY score DESC 
  LIMIT 3;
`);


    res.render('main', {
      restaurants: allRestaurants.rows,
      topRestaurants: topRestaurants.rows,
      query: req.query
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.detail_res = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM restaurant WHERE res_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Restaurant not found');
    }

    const restaurant = result.rows[0];
    res.render('detail_res', { restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
