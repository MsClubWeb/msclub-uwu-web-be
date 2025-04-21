// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool =mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// async function testConnection() {
//     try {
//       const [rows] = await pool.query('SELECT 1 + 1 AS result');
//       console.log('MySQL connected. Test result:', rows[0].result); // should print 2
//     } catch (err) {
//       console.error(' MySQL connection failed:', err.message);
//     }
//   }
  
//   testConnection();

// module.exports = pool;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('MySQL connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;

