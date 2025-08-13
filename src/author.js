// src/authorRepo.js
const { getPool } = require('./db');

/** Todos los autores */
async function getAll() {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT * FROM `authors` ORDER BY `au_lname`, `au_fname`'
  );
  return rows;
}

/** Autores por estado (ej. 'CA') */
async function getAllWithState(state) {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT * FROM `authors` WHERE `state` = ? ORDER BY `au_lname`, `au_fname`',
    [state]
  );
  return rows;
}

/** Un autor por ID (PK) */
async function getById(id) {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT * FROM `authors` WHERE `au_id` = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

module.exports = { getAll, getAllWithState, getById };
