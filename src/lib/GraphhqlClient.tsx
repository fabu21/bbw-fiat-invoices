import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

const httpLink = new HttpLink({
  uri: 'https://api.mainnet.galoy.io/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'wss://api.mainnet.galoy.io/graphql',
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" && definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink,
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});