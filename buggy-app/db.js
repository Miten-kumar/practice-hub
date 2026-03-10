const fakeDB = {};

for (let i = 1; i <= 1000; i++) {
  fakeDB[i] = {
    id: i,
    name: "User " + i,
  };
}

export async function getDataFromDB(id) {
  // simulate slow DB
  await new Promise((resolve) => setTimeout(resolve, 200));

  return fakeDB[id] || null;
}
