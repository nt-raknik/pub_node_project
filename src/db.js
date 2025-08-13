// src/db.js
require('dotenv').config();
import { connect } from 'mysql2';

const config = {
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: {
    encrypt: true, // required for Azure SQL; fine on-prem too
    trustServerCertificate: process.env.TRUST_CERT === 'true' // allow self-signed in dev
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;
async function getPool() {
  if (pool) return pool;
  pool = await connect(config);
  console.log('Database connected');
  return pool;
}

export default { sql, getPool };
