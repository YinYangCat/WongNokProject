const pool = require('../db');

module.exports = async (req, res) => {
const userId = req.session.userId;
if (!userId) return res.redirect('/login');

try {
const result = await pool.query('SELECT name, email FROM users WHERE userid = $1', [userId]);
const user = result.rows[0];
res.render('profile', { user });
} catch (err) {
console.error('Error loading profile:', err);
res.status(500).send('Server error');
}
};
