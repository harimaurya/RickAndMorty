import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const GQL_ENDPOINT =
  process.env.GQL_ENDPOINT || "https://rickandmortyapi.com/graphql";

const client = new ApolloClient({
  link: new HttpLink({
    uri: GQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

export default client;
