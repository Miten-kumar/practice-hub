import express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import productV2Router from "./routes/v2/productRoutes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

const app = express();
const PORT = 3000;

AppDataSource.initialize();

app.use(express.json());

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/v2/products", productV2Router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
