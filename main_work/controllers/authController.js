const pool = require('../index.js'); // your db.js
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Basic validation
  if (password !== confirmPassword) {
    return res.render('register', { errors: ['Passwords do not match'], username, email });
  }

  try {
    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1 OR name = $2', [email, username]);
    if (userCheck.rows.length > 0) {
      return res.render('register', { errors: ['Email or username already taken'], username, email });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 50);

    // Insert user into DB
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    // Redirect to login page after successful registration
    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
};
