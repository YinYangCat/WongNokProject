// controllers/profileController.js
const pool = require('../db');

module.exports = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.redirect('/login');

    try {
        // Fetch user data along with photo URL
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

        const user = result.rows[0];

        // Check if the user has a profile picture
        if (user && user.photourl) {
            console.log("Profile Picture URL:", user.photourl); // Debug line
        } else {
            console.log("No profile picture found");
        }

        res.render('profile', { user });
    } catch (err) {
        console.error('Error loading profile:', err);
        res.status(500).send('Server error');
    }
};
