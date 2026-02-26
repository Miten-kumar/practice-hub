import express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

// CRUD operations for ecommerce application

// Create a new user
app.use("/user", userRouter);

app.use("/products", productRouter);

// // Place an order
// app.use("/orders", orderRouter);

// app.use("/reviews", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
