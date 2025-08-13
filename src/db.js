// src/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // timezone: 'Z', // opcional: fuerza UTC
    // dateStrings: true, // opcional: devuelve DATETIME como string
  });
  return pool;
}

module.exports = { getPool };
