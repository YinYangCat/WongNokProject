// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'your database name',
    password: 'Your postpres password',
    port: 5432,
});

module.exports = pool;
