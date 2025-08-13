// src/example.js
const { getAll, getAllWithState } = require('./author');

(async () => {
  try {
    //const all = await getAll();
    //console.log('Todos los autores:', all);

    const ca = await getAllWithState('CA'); // cambia por el estado que tengas en tu data
    console.log('Autores en CA:', ca);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();