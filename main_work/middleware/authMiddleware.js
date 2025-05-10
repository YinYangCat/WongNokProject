const pool = require('../db'); // use the actual db file, not index.js

module.exports = (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login'); // better UX to redirect to login
  }

  pool.query('SELECT * FROM users WHERE userid = $1', [userId]) // make sure column name is correct
    .then(result => {
      if (result.rows.length === 0) {
        return res.redirect('/login'); // not found = not logged in
      }

      // Optionally store the user data for use in views/controllers
      req.user = result.rows[0];
      res.locals.user = result.rows[0]; // for use in EJS templates if needed

      console.log('User verified:', result.rows[0].name);
      next();
    })
    .catch(err => {
      console.error('DB error in auth middleware:', err);
      res.redirect('/login');
    });
};
