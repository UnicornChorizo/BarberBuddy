const pool = require('./db');

pool.query('SELECT * FROM barbers', (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows);
});
