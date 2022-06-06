import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import {API_URL} from './Config'

const httpLink = new HttpLink({
  uri: `https://${API_URL}`,
})

const wsLink = new WebSocketLink({
  uri: `wss://${API_URL}`,
  options: {
    reconnect: false,
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