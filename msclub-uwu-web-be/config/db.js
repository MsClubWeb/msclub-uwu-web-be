const mysql = require('mysql2/promise');
require('dotenv').config();

const pool =mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function testConnection() {
    try {
      const [rows] = await pool.query('SELECT 1 + 1 AS result');
      console.log('MySQL connected. Test result:', rows[0].result); // should print 2
    } catch (err) {
      console.error(' MySQL connection failed:', err.message);
    }
  }
  
  testConnection();

module.exports = pool;