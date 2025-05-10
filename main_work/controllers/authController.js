const pool = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Basic validation
  if (password !== confirmPassword) {
  return res.render('register', { errors: ['Passwords do not match'], username, email });
  }

  try {

    console.log("Before DB test");
    // await pool.query('SELECT NOW()'); // 👈 Quick DB test
    // console.log("after DB test");

    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1 OR name = $2', [email, username]);
    if (userCheck.rows.length > 0) {
      return res.render('register', { errors: ['Email or username already taken'], username, email });
    }
    console.log("after Check test");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("after hash test");

    // Insert user into DB
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );
    console.log("After DBsuccess test");

    // Redirect to login page after successful registration
    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.render('login', { errors: ['Email not found'], email });
    }

    const user = result.rows[0];
    console.log('User from DB:', user); // 👈 Check what is being returned
    console.log('Form password:', password); // 👈 Should be a string
    console.log('Hashed password:', user.password); // 👈 Should be a string

    if (!user.password || typeof user.password !== 'string') {
      throw new Error('Invalid hash in database');
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { errors: ['Invalid email or password']});
    }

    // 3. If successful, create a session (or token, depending on setup)
    // For now, simple redirect
    res.redirect('/main'); // change this to wherever you want after login

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};
