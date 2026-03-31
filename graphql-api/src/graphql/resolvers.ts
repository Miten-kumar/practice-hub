import type DataLoader from "dataloader";

import { orders, users, type Order, type User } from "../db/db.js";
import { generateToken } from "../utils/jwt.js";

type GraphQLContext = {
  user: User | null;
  loaders: {
    orderLoader: DataLoader<string, Order[]>;
  };
};

type UserArgs = {
  id: string;
};

type LoginArgs = {
  email: string;
};

type CreateOrderArgs = {
  product: string;
  amount: number;
};

export const resolvers = {
  Query: {
    users: (): User[] => users,
    user: (_parent: unknown, { id }: UserArgs): User | undefined =>
      users.find((user) => user.id === id),
  },

  User: {
    orders: (user: User, _args: unknown, { loaders }: GraphQLContext) =>
      loaders.orderLoader.load(user.id),
  },

  Order: {
    user: (order: Order): User | undefined =>
      users.find((user) => user.id === order.userId),
  },

  Mutation: {
    login: (_parent: unknown, { email }: LoginArgs) => {
      const user = users.find((entry) => entry.email === email);

      if (!user) {
        throw new Error("User not found");
      }

      return {
        token: generateToken(user),
        user,
      };
    },

    createOrder: (
      _parent: unknown,
      args: CreateOrderArgs,
      context: GraphQLContext,
    ): Order => {
      if (!context.user) throw new Error("Unauthorized");

      const newOrder = {
        id: String(orders.length + 1),
        ...args,
        userId: context.user.id,
      };

      orders.push(newOrder);
      return newOrder;
    },
  },
};
