const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'barberbuddy_db',
    password: 'Unicorn98',
    port: 3000, //Change back to 5432
});

module.exports = pool;
