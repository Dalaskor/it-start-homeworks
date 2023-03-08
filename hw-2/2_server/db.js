const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'dalaskor',
    password: '',
    host: 'localhost',
    port: '5432',
    database: 'films2'
});

module.exports = pool;
