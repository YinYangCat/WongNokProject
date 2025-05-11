const pool = require('../db');

module.exports = async (req, res) => {
const userId = req.session.userId;
if (!userId) return res.redirect('/login');

try {
// Join with photo table to get the image filename
const result = await pool.query('SELECT u.name, u.email, p.photourl FROM users u LEFT JOIN photo p ON u.profilepic = p.photoid WHERE u.userid = $1',[userId]);
const user = result.rows[0];
res.render('profile', { user });
} catch (err) {
console.error('Error loading profile:', err);
res.status(500).send('Server error');
}
};
