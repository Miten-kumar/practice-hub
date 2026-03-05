import express from "express";
import userRoutes from "./routes/user.routes.js";
import productsRoutes from "./routes/products.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/reviews", reviewsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
