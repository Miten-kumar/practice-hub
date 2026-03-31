import type { Request } from "express";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import routes from "./rest/routes.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { createLoaders } from "./graphql/loaders.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: Request }) => ({
    user: authMiddleware(req),
    loaders: createLoaders(),
  }),
});

(async () => {
  await server.start();
  server.applyMiddleware({
    app: app as Parameters<typeof server.applyMiddleware>[0]["app"],
  });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
  });
})();
