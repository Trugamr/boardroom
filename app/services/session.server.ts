import { createCookieSessionStorage } from '@remix-run/node'
import { getServerEnv } from './env.server'

const { NODE_ENV, COOKIE_SECRET } = getServerEnv()

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: NODE_ENV === 'production',
    secrets: [COOKIE_SECRET],
  },
})

export let { getSession, commitSession, destroySession } = sessionStorage
