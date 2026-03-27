export interface IOrder {
  order_id?: number;
  user_id?: number;
  prod_id?: number;
  quantity?: number;
  status?: "pending" | "completed" | "failed";
  version?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
