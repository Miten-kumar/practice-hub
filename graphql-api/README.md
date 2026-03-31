# GraphQL API

Minimal challenge implementation that keeps the existing REST API and adds GraphQL on top.

## What was applied

- GraphQL schema for `User`, `Order`, queries, and mutations
- Resolvers for fetching users and creating orders
- `DataLoader` to batch `User.orders` and avoid N+1
- JWT authentication with a `login` mutation and protected `createOrder`
- REST and GraphQL side-by-side for comparison

## REST vs GraphQL

- REST is simpler for fixed endpoints like `/api/users` and `/api/users/:id/orders`
- GraphQL is better when the client needs flexible nested data in one request
- Without batching, GraphQL field resolvers can cause N+1 queries; `DataLoader` fixes that pattern
- REST can be easier to cache at the HTTP layer
- GraphQL reduces over-fetching and round trips for connected data

## When to choose

- Choose REST for simple CRUD, public APIs, and straightforward caching
- Choose GraphQL when clients need different shapes of related data and want one flexible endpoint

## Example GraphQL operations

```graphql
mutation {
  login(email: "manush@test.com") {
    token
    user {
      id
      name
    }
  }
}
```

```graphql
query {
  users {
    id
    name
    orders {
      id
      product
    }
  }
}
```

```graphql
mutation {
  createOrder(product: "Keyboard", amount: 1) {
    id
    product
    amount
  }
}
```

Use the `login` token as `Authorization: <token>`.
