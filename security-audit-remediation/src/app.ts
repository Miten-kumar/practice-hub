import express from "express";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";
import { securityHeadersMiddleware } from "./middlewares/security-headers.middleware";
import { securityRoutes } from "./routes/security.routes";

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(securityHeadersMiddleware);
app.use("/", securityRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
