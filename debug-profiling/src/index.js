const express = require("express");
const app = express();
const Mutex = require("async-mutex");
const mutex = new Mutex.Mutex();
let users = [];
let counter = 0;

// MEMORY LEAK
let cache = [];
const MAX_CACHE = 10;

app.get("/memory-leak", (req, res) => {
  const largeObject = {
    data: new Array(100000).fill("memory leak data"),
    timestamp: Date.now(),
  };

  if (cache.length >= MAX_CACHE) {
    cache.shift(); 
  }

  cache.push(largeObject); 

  res.json({
    message: "Stored object in memory",
    cacheSize: cache.length,
  });
});


// EVENT LOOP BLOCKING
app.get("/block", async(req, res) => {
  const result = await new Promise((resolve) => {
    setImmediate(() => {
      let sum = 0;

      for (let i = 0; i < 1e8; i++) {
        sum += i;
      }

      resolve(sum);
    });
  });

  res.send(`Heavy task done without blocking result ${result}`);
});

// RACE CONDITION
app.get("/race", async (req, res) => {
  await mutex.runExclusive(async () => {
    let current = counter;

    await new Promise((resolve) => setTimeout(resolve, 100));

    counter = current + 1;
  });

  res.json({
    counter,
  });
});

app.get("/counter", (req, res) => {
  res.json({ counter });
});

app.get("/", (req, res) => {
  res.send("Not a buggy App Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});