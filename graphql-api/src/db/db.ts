export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  product: string;
  amount: number;
  userId: string;
};

export const users: User[] = [
  { id: "1", name: "Manush", email: "manush@test.com" },
  { id: "2", name: "John", email: "john@test.com" },
];

export const orders: Order[] = [
  { id: "1", product: "Phone", amount: 2, userId: "1" },
  { id: "2", product: "Laptop", amount: 1, userId: "1" },
  { id: "3", product: "Shoes", amount: 3, userId: "2" },
];
