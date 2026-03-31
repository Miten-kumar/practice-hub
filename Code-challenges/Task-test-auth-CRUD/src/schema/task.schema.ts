import { ApolloServer } from '@apollo/server'

export const typeDefs = `#graphql
  type Task{
    id:ID!,
    name:String!
  }
  
  type Query {
    tasks : [Task!]!
    task(id:ID!) : Task
  }

  input CreateTaskInput {
  name: String!
}

input UpdateTaskInput {
  name: String
}

type Mutation {
  createTask(input: CreateTaskInput!): Task
  updateTask(id: ID!, input: UpdateTaskInput!): Task
  deleteTask(id: ID!): Boolean
}
 
`

