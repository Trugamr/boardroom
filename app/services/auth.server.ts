import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { SteamStrategy, type SteamStrategyVerifyParams } from 'remix-auth-steam'
import { getServerEnv } from './env.server'

const { STEAM_API_KEY, STEAM_CALLBACK_URL } = getServerEnv()

export type User = SteamStrategyVerifyParams

export let authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(
  new SteamStrategy(
    {
      returnURL: STEAM_CALLBACK_URL,
      apiKey: STEAM_API_KEY,
    },
    async user => {
      console.log(user)
      return user
    },
  ),
)
