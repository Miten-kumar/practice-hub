import express, { Request, Response } from "express";
const app = express();

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Manush Patel this side");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
