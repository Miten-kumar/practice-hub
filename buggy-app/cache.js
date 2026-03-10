/*
Original cache implementation used a simple object
with no limit.

Cache size increased indefinitely that may cause
memory leak.

Fix:
Add maximum cache size and remove oldest entry.
*/

export const cache = {};

const MAX_CACHE = 100;

export function setCache(key, value) {
  /*
  If cache grows out of limit remove
  the oldest stored key.
  */
  if (Object.keys(cache).length > MAX_CACHE) {
    const firstKey = Object.keys(cache)[0];

    delete cache[firstKey];
  }

  cache[key] = value;
}
