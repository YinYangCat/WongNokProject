// authMiddleware.js
const pool = require('../db');

module.exports = (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  pool.query('SELECT * FROM users WHERE userid = $1', [userId])
    .then(async result => {
      if (result.rows.length === 0) {
        return res.redirect('/login');
      }

      req.user = result.rows[0];
      res.locals.user = result.rows[0];

      // Check if the user is an admin
      const adminCheck = await pool.query('SELECT * FROM admin WHERE userid = $1', [userId]);
      req.user.isAdmin = adminCheck.rows.length > 0;
      res.locals.user.isAdmin = req.user.isAdmin; // make sure this line is here

      console.log('User verified:', result.rows[0].name, "Admin:", req.user.isAdmin);
      next();
    })
    .catch(err => {
      console.error('DB error in auth middleware:', err);
      res.redirect('/login');
    });
};
