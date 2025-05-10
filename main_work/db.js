// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Wongnok',
    password: 'White20050403.',
    port: 5432,
});

module.exports = pool;
