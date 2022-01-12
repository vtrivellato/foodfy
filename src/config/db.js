const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '#Game0077',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})