import express from "express";
import { heavyComputation } from "./heavyTask.js";
import { getDataFromDB } from "./db.js";
import { cache, setCache } from "./cache.js";

const app = express();

/*
Original code stored every request log in an array without limit.
During load testing (autocannon) memory usage kept increasing.

Fix:
Limit the log size to avoid memory leak.
*/
let requestLogs = [];
const MAX_LOGS = 100;

app.get("/data", async (req, res) => {
  // store request log
  requestLogs.push({
    time: Date.now(),
    url: req.url,
  });

  /*
  If logs exceed MAX_LOGS remove the oldest entry.
  This prevents unbounded memory growth.
  */
  if (requestLogs.length > MAX_LOGS) {
    requestLogs.shift();
  }

  const id = req.query.id || "1";

  /*
  During profiling many DB calls were happening
  for the same id which reduced performance.

  Fix:
  Check cache first before calling database.
  */
  if (cache[id]) {
    return res.json({ data: cache[id] });
  }

  /*
  DB call simulated slow operation.
  Without caching this endpoint became slow.
  */
  const data = await getDataFromDB(id);

  /*
  Store data in cache so future requests
  don't call DB again.
  */
  setCache(id, data);

  res.json({ data });
});

app.get("/compute", (req, res) => {
  let num = parseInt(req.query.num) || 40;

  /*
  Large numbers caused event loop blocking
  because Fibonacci recursion was CPU heavy.

  Fix:
  Limit maximum input value.
  */
  if (num > 35) {
    num = 35;
  }

  const result = heavyComputation(num);

  res.json({ result });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
