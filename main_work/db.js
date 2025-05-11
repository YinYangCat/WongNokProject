// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Wongnok',
    password: '48621793a',
    port: 5432,
});

module.exports = pool;
