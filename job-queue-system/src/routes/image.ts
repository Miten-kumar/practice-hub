import express from "express";
import { imageProcessor } from "../controller/imageProcess.controller.js";

export const imageRoute = express.Router();

imageRoute.post("/process", imageProcessor);
