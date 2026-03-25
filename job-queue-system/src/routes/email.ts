import express from "express";
import { sendEmail } from "../controller/email.controller.js";

export const emailRoute = express.Router();

emailRoute.post("/", sendEmail);
