import express from "express";
import { upload } from "./middleware/fileUploadMiddleware.js";
import { uploadFiles } from "./controller/uploadControllr.js";
import chunkUploadRouter from "./routes/uploadRoutes.js";

const app = express();

app.post("/upload-large-file", chunkUploadRouter);
app.post("/upload", upload.array("files", 10), uploadFiles);

app.listen(3000, () => {
  console.log("server is running on : 3000");
});
