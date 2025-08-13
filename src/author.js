
    


    // src/authorRepo.js
const { getPool } = require('./db');

/** Obtiene todos los autores */
async function getAll() {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT * FROM pubs.authors;`
  );
  return rows;
}

/** Obtiene autores filtrando por estado (ej. 'CA') */
async function getAllWithState(state) {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT * FROM pubs.authors WHERE `state` = ? ORDER BY `au_lname`, `au_fname`' ,
    [state]
  );
  return rows;
}

module.exports = { getAll, getAllWithState };