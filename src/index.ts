import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { context } from "./context";
import { schema } from "./schema";

export const server = new ApolloServer({
  context,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground() // use this for offline playground use
  ],
  schema,
});

const port = 4000;
server.listen({ port }).then(({ url }: { url: String }) => {
  console.log(`🚀  Server ready at ${url}`);
});
