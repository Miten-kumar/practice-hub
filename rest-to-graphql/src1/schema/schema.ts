// src/schema/typeDefs.ts

export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUsers(limit: Int!, offset: Int!): [User]
    getUser(id: ID!): User
  }

  input CreateUserInput {
    name: String!
  }

  input LoginInput {
    name: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    login(input: LoginInput!): AuthPayload
  }
`;