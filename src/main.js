// src/example.js
import { getAll, getAllWithState } from './author.js';

(async () => {
  try {
    const all = await getAll();
    console.log('All authors:', all);

    const ca = await getAllWithState('CA');
    console.log('Authors in CA:', ca);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
