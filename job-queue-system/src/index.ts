import express from "express";
import { addEmailJob } from "./queues/email.queue";
import { addImageJob } from "./queues/image.queue";

const app = express();
app.use(express.json());

app.post("/email", async (req, res) => {
  await addEmailJob(req.body);
  res.send("Email job added");
});

app.post("/image", async (req, res) => {
  await addImageJob(req.body);
  res.send("Image job added");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});