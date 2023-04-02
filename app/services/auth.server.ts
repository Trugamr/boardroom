import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { SteamStrategy } from 'remix-auth-steam'
import { getServerEnv } from './env.server'
import { verifySteamUser } from './user.server'

const { STEAM_API_KEY, STEAM_CALLBACK_URL } = getServerEnv()

export let authenticator = new Authenticator<{ userId: string }>(sessionStorage)

authenticator.use(
  new SteamStrategy(
    {
      returnURL: STEAM_CALLBACK_URL,
      apiKey: STEAM_API_KEY,
    },
    verifySteamUser,
  ),
)
