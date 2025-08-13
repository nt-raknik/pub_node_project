// src/testConnection.js
const { getPool } = require('./db');

(async () => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT 1 AS result');
    console.log('Conexión exitosa. Resultado:', rows);
    process.exit(0);
  } catch (err) {
    console.error('Error de conexión:', err.message);
    process.exit(1);
  }
})();