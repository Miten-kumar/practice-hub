import express from "express";
import { users, orders } from "../db/db.js";

const router = express.Router();

router.get("/users", (req, res) => {
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  res.json(user);
});

router.get("/users/:id/orders", (req, res) => {
  const userOrders = orders.filter((o) => o.userId === req.params.id);
  res.json(userOrders);
});

export default router;
