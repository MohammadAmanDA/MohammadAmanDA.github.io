/**
 * Clears Astro's content-layer store before `dev` starts.
 *
 * Astro caches loaded collection entries in .astro/. When a collection's schema
 * or files change while a dev server is running — or between runs — that cache
 * can go stale and the collection silently comes back empty: pages render with
 * their headings and none of their content, which reads as a layout bug rather
 * than a cache one. It cost an hour to find once; deleting the store on start
 * costs about a second.
 */
import { rmSync } from 'node:fs';

for (const path of ['.astro/data-store.json', 'node_modules/.astro']) {
  rmSync(path, { recursive: true, force: true });
}
console.log('Content cache cleared.');
