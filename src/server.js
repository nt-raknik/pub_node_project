// src/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const bodyParser = require('body-parser');

const { getAll, getAllWithState, getById } = require('./author.js');

const app = express();

// body-parser (JSON y formularios)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /
app.get('/', (_req, res) => {
  res.json({
    service: 'pubs-authors-api',
    status: 'ok',
    time: new Date().toISOString(),
  });
});

// GET /api/authors  y  /api/authors?state=CA
app.get('/api/authors', async (req, res) => {
  try {
    const state = typeof req.query.state === 'string' ? req.query.state.trim() : '';
    console.log('GET /api/authors', { state });
    if (state && state.length > 0) {
      const authors = await getAllWithState(state.toUpperCase());
      return res.json(authors);
    }
    const authors = await getAll();
    res.json(authors);
  } catch (err) {
    console.error('Error en GET /api/authors:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/authors/:id
app.get('/api/authors/:id', async (req, res) => {
  try {
    const id = (req.params.id || '').trim();
    if (!id) return res.status(400).json({ error: 'Parámetro :id requerido' });

    const author = await getById(id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });

    res.json(author);
  } catch (err) {
    console.error('Error en GET /api/authors/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Arrancar servidor
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
