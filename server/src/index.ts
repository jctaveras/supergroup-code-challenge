import { ApolloServer } from "apollo-server";

import { schema } from './schema';
import { context } from "./context";

const server = new ApolloServer({ context, schema });

const port = process.env.PORT || 8080;


server.listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Server Running on ${url}`);
  });
