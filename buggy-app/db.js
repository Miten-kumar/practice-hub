/*
This file has a slow database operations.

Used during debugging to reproduce:
- slow response time
- need for caching
*/

const fakeDB = {};

for (let i = 1; i <= 1000; i++) {
  fakeDB[i] = {
    id: i,
    name: "User " + i,
  };
}

export async function getDataFromDB(id) {
  // simulated slow DB response
  await new Promise((resolve) => setTimeout(resolve, 200));

  return fakeDB[id] || null;
}
