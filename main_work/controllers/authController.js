const pool = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const file = req.file;

  if (password !== confirmPassword) {
    return res.render('register', {
      errors: ['Passwords do not match'],
      username,
      email,
    });
  }

  try {
    // Check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR name = $2',
      [email, username]
    );
    if (userCheck.rows.length > 0) {
      return res.render('register', {
        errors: ['Email or username already taken'],
        username,
        email,
      });
    }

    let photoId = null;
    if (file) {
      // Insert photo and get its id
      const photoResult = await pool.query(
        'INSERT INTO photo (photourl) VALUES ($1) RETURNING photoid',
        [file.filename]
      );
      photoId = photoResult.rows[0].photoid;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.query(
      'INSERT INTO users (name, email, password, profilepic) VALUES ($1, $2, $3, $4)',
      [username, email, hashedPassword, photoId]
    );

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

    req.session.userId = user.userid; // VERY IMPORTANT

    // 3. Create session
    req.session.user = {
      id: user.userid,         // or user.id based on your DB
      name: user.name,         // optional: save any field you want
      email: user.email
    };

    res.redirect('/'); // or wherever you want to go after login

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};