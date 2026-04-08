import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(userRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});