import express from "express";
import userRoutes from "./routes/user.routes";
import { requestLogger } from "./middlewares/requestLogger";
import { responseFormatter } from "./middlewares/responseFormatter";
import { apiLimiter } from "./middlewares/rateLimiter";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(responseFormatter);
app.use(apiLimiter);

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
