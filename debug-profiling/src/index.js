const express = require("express");
const app = express();

let users = [];
let counter = 0;

// MEMORY LEAK
let cache = [];

app.get("/memory-leak", (req, res) => {
  const largeObject = {
    data: new Array(100000).fill("memory leak data"),
    timestamp: Date.now(),
  };

  cache.push(largeObject); 

  res.json({
    message: "Stored object in memory",
    cacheSize: cache.length,
  });
});


// EVENT LOOP BLOCKING
app.get("/block", (req, res) => {
  const start = Date.now();

  while (Date.now() - start < 5000) {
  }

  res.send("Event loop was blocked for 5 seconds");
});

// RACE CONDITION
app.get("/race", async (req, res) => {
  let current = counter;

  await new Promise((resolve) => setTimeout(resolve, 100));

  counter = current + 1;

  res.json({
    counter,
  });
});

app.get("/counter", (req, res) => {
  res.json({ counter });
});

app.get("/", (req, res) => {
  res.send("Buggy App Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});