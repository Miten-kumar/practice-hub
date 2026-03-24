import express from "express";
import userRoutes from "./routes/v1/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import rateLimit from "./middlewares/rateLimit.middleware";
import { setupSwagger } from "./docs/swagger";
const app = express();

app.use(express.json());
app.use(rateLimit);

// Versioned routes
app.use("/api/v1/users", userRoutes);

// Error handler (last)
app.use(errorHandler);

setupSwagger(app);
export default app;