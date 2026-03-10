import express from "express";
import { heavyComputation } from "./heavyTask.js";
import { getDataFromDB } from "./db.js";
import { cache } from "./cache.js";

const app = express();

let requestLogs = [];

app.get("/data", async (req, res) => {
  // ❌ MEMORY LEAK
  requestLogs.push({
    time: Date.now(),
    url: req.url,
  });

  const id = req.query.id || "1";

  // ❌ RACE CONDITION
  let cached = cache[id];

  if (!cached) {
    const data = await getDataFromDB(id);
    cache[id] = data;
    cached = data;
  }

  res.json({
    data: cached,
  });
});

app.get("/compute", (req, res) => {
  const num = parseInt(req.query.num) || 40;

  // ❌ EVENT LOOP BLOCKING
  const result = heavyComputation(num);

  res.json({
    result,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
