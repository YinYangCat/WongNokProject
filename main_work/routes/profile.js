router.post('/profile/update', async (req, res) => {
const userId = req.session.userId;
const { name, password } = req.body;
const hashed = await require('bcrypt').hash(password, 12);

try {
await pool.query(
'UPDATE users SET name = $1, password = $2 WHERE userid = $3',
[name, hashed, userId]
);
res.redirect('/profile');
} catch (err) {
console.error('Profile update error:', err);
res.status(500).send('Server error');
}
});
