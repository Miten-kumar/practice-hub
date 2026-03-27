import express from "express";
import logger from "./logger/logger.js";
import { userRoute } from "./routes/user.route.js";
import { correlationIdMiddleware } from "./middlewares/correlationId.js";
import { metricsMiddleware } from "./middlewares/metricsMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

// logger.info("this is my first log");
app.use(correlationIdMiddleware);
app.use(metricsMiddleware);

app.use("/user", userRoute);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
