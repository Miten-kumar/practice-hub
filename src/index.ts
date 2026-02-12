import express, { Request, Response } from "express";
import userRoutes from "./Routes/userRoutes";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
