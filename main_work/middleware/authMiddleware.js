// middleware/authMiddleware.js
const pool = require('../db');

module.exports = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    // Fetch user data along with profile picture
    const result = await pool.query(`
      SELECT 
        u.userid, 
        u.name, 
        u.email, 
        p.photourl, 
        CASE WHEN a.adminid IS NOT NULL THEN true ELSE false END AS isadmin
      FROM users u
      LEFT JOIN photo p ON u.profilepic = p.photoid
      LEFT JOIN admin a ON u.userid = a.userid
      WHERE u.userid = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.redirect('/login');
    }

    req.user = result.rows[0];
    res.locals.user = result.rows[0];

    console.log('User verified:', result.rows[0].name, "Admin:", req.user.isadmin);
    console.log('User photo URL:', req.user.photourl); // Debug line

    next();
  } catch (err) {
    console.error('DB error in auth middleware:', err);
    res.redirect('/login');
  }
};
