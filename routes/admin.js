// routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireLogin = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Show admin panel
router.get('/admin', requireLogin, async (req, res) => {
try {
if (!req.user.isadmin) {
return res.status(403).send('Forbidden: You are not an admin');
}
const result = await pool.query('SELECT * FROM restaurants ORDER BY name');
const restaurants = result.rows;
res.render('admin', { restaurants });
} catch (err) {
console.error('Error loading admin panel:', err);
res.status(500).send('Server error');
}
});

// Add new restaurant (unchanged)
router.post('/admin/add', requireLogin, async (req, res) => {
if (!req.user.isadmin) {
return res.status(403).send('Forbidden: You are not an admin');
}

const {
res_id, name, phone_no, address, province,
avg_rating, review_count, open_time, close_time
} = req.body;

try {
await pool.query(
'INSERT INTO restaurants (res_id, name, phone_no, address, province, avg_rating, review_count, open_time, close_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
[res_id, name, phone_no, address, province, avg_rating, review_count, open_time, close_time]
);
res.redirect('/admin');
} catch (err) {
console.error('Error adding restaurant:', err);
res.status(500).send('Server error');
}
});

// Get restaurant details for editing — fixed backticks for SQL query
router.get('/admin/edit/:res_id', requireLogin, async (req, res) => {
if (!req.user.isadmin) {
return res.status(403).send('Forbidden: You are not an admin');
}

const res_id = req.params.res_id;

try {
const result = await pool.query(
  `SELECT r.*, p.photourl 
   FROM restaurants r 
   LEFT JOIN photo p 
   ON r.respic = p.photoid 
   WHERE r.res_id = $1`, 
  [res_id]
);

if (result.rows.length === 0) {
  return res.status(404).send('Restaurant not found');
}

const restaurant = result.rows[0];
res.render('editRestaurant', { restaurant });
} catch (err) {
console.error('Error fetching restaurant for editing:', err);
res.status(500).send('Server error');
}
});

// Update restaurant — fixed SQL query string, JavaScript expression, and logic
router.post('/admin/edit/:res_id', requireLogin, upload.single('photo'), async (req, res) => {
if (!req.user.isadmin) {
return res.status(403).send('Forbidden: You are not an admin');
}

const res_id = req.params.res_id;
const {
name, phone_no, address, province,
avg_rating, review_count, open_time, close_time
} = req.body;

try {
let respic = null;
if (req.file) {
  const photoResult = await pool.query(
    'INSERT INTO photo (photourl) VALUES ($1) RETURNING photoid',
    [req.file.filename]
  );
  respic = photoResult.rows[0].photoid;
}

const updateFields = [
  'name = $1',
  'phone_no = $2',
  'address = $3',
  'province = $4',
  'avg_rating = $5',
  'review_count = $6',
  'open_time = $7',
  'close_time = $8'
];
const values = [
  name, phone_no, address, province,
  avg_rating, review_count, open_time, close_time
];

if (respic) {
  updateFields.push('respic = $9');
  values.push(respic);
  values.push(res_id); // $10
} else {
  values.push(res_id); // $9
}

const updateQuery = `
  UPDATE restaurants
  SET ${updateFields.join(', ')}
  WHERE res_id = $${values.length}
`;

await pool.query(updateQuery, values);
res.redirect('/admin');
} catch (err) {
console.error('Error updating restaurant:', err);
res.status(500).send('Server error');
}
});

module.exports = router;    