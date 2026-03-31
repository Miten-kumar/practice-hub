import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
  }

  type Order {
    id: ID!
    product: String!
    amount: Int!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!): AuthPayload!
    createOrder(product: String!, amount: Int!): Order!
  }
`;
