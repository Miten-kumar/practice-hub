import { AppDataSource } from "./data-source";
import "reflect-metadata";
import app from "./app";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/task.schema";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./resolvers/task.resolver";
import { verifyToken } from "./utils/jwt";

const PORT = process.env.port || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;

    const user = verifyToken(token); 

    return { user };
  },
});

await server.start();

app.use("/graphql", expressMiddleware(server));

AppDataSource.initialize()
  .then(() => {
    console.log("connection successful");

    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
