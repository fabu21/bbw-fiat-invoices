import {
  gql,
} from "@apollo/client"
import { client } from '../lib/GraphhqlClient'

const USER_WALLET_ID = gql`
query userDefaultWalletId($username: Username!) {
  userDefaultWalletId(username: $username)
}
`
export default async function GetDefaultWallet(username: string) {
  let defaultWalletId: string = ""

  const { data } = await client.query({
    query: USER_WALLET_ID,
    variables: { username }
  })

  defaultWalletId = data.userDefaultWalletId

  return defaultWalletId
}