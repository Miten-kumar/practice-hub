import DataLoader from "dataloader";
import { orders, type Order } from "../db/db.js";

export const createLoaders = () => ({
  orderLoader: new DataLoader<string, Order[]>(async (userIds) =>
    userIds.map((id) => orders.filter((order) => order.userId === id)),
  ),
});
