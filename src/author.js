// src/authorRepo.js
import { getPool, sql } from './db.js';

/**
 * Returns all authors
 * @returns {Promise<Array>}
 */
async function getAll() {
  const pool = await getPool();
  const result = await pool.request().query(
    `SELECT * FROM pubs.authors;`
 );
  return result.recordset;
}

/**
 * Returns authors filtered by state (2-letter code, e.g., 'CA')
 * @param {string} state
 * @returns {Promise<Array>}
 */
async function getAllWithState(state) {
  const pool = await getPool();
  const result = await pool.request()
    .input('state', sql.VarChar(2), state)
    .query(`
      SELECT * FROM pubs.authors WHERE state= @state;`
    );
  return result.recordset;
}

export default {
  getAll,
  getAllWithState
};
