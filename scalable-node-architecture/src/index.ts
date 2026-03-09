import express from "express";
import { Request, Response } from "express";
const app = express();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: `server is running on ${port}` });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log("server is running on port 3000");
});

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  const isShuttingDown = true;

  server.close(async () => {
    console.log("HTTP server closed");

    try {
      // close DB connection

      console.log("Cleanup complete");
      process.exit(0);
    } catch (err) {
      console.error("Shutdown error", err);
      process.exit(1);
    }
  });

  // force shutdown after timeout
  setTimeout(() => {
    console.error("Force shutdown");
    process.exit(1);
  }, 10000);
};

// app.get("/shutdown", shutdown);

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
