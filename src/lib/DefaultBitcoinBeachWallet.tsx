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

  try {
    const { data } = await client.query({
      query: USER_WALLET_ID,
      variables: { username }
    })

    console.log(data)

    defaultWalletId = data.userDefaultWalletId
  } catch (err) {
    console.log(err)
    // return res.json({
    // status: "ERROR",
    // reason: `Couldn't find user '${username}'.`,
  }
  return defaultWalletId
}