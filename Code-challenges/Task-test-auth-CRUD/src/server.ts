import { AppDataSource } from "./data-source";
import "reflect-metadata";
import app from "./app";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/task.schema";
import { expressMiddleware } from "@as-integrations/express5"
import { Context, resolvers } from "./resolvers/task.resolver";
import { verifyToken } from "./utils/jwt";
import { createTaskLoader } from "./loaders/task.loader";
import depthLimit from 'graphql-depth-limit';

const PORT = process.env.port || 3000;

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)]

});

await server.start();

app.use(
  "/graphql",
  expressMiddleware (server, {
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const user = token ? verifyToken(token) : null;
 
      return {
        user,
        loaders: {
          task: createTaskLoader(),
        },
      };
    },
  }),
);
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
