import express, { Request, Response } from "express";
import authRoutes from "./routes/authRouter";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
