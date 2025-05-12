// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Wongnok',//Use your database name
    password: 'Use your own password',//Change this
    port: 5432,
});

module.exports = pool;
