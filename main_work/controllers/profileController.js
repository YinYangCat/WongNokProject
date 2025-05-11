// profileController.js
const pool = require('../db');

module.exports = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.redirect('/login');

    try {
        // Fetch user data along with admin status
        const result = await pool.query(`
            SELECT u.name, u.email, p.photourl, 
            CASE WHEN a.adminid IS NOT NULL THEN true ELSE false END AS isAdmin
            FROM users u 
            LEFT JOIN photo p ON u.profilepic = p.photoid
            LEFT JOIN admin a ON u.userid = a.userid
            WHERE u.userid = $1
        `, [userId]);

        const user = result.rows[0];
        console.log("User data:", user); // Add this line to check if isAdmin is being passed
        res.render('profile', { user });
    } catch (err) {
        console.error('Error loading profile:', err);
        res.status(500).send('Server error');
    }
};
