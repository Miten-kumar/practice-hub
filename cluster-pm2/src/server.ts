import express from "express";
import os from "os";

const app = express();
const PORT = process.env.PORT || 3000;

let isShuttingDown = false;

app.get("/", (req, res) => {
  res.json({
    PORT:PORT,
    message: "Server running",
    pid: process.pid,
    cpu: os.cpus().length
  });
});

app.get("/health", (req, res) => {
  if (isShuttingDown) {
    return res.status(500).json({ status: "shutting_down" });
  }

  res.json({
    status: "ok",
    pid: process.pid
  });
});

const server = app.listen(PORT, () => {
  console.log(`Worker ${process.pid} running on ${PORT}`);
});


const shutdown = () => {
  console.log(`Worker ${process.pid} shutting down`);

  isShuttingDown = true;

  server.close(() => {
    console.log("Closed remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);