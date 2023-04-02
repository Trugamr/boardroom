import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { authenticator } from '~/services/auth.server'
import { getUserById } from '~/services/user.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Boardroom' }]
}

export let loader = async ({ request }: LoaderArgs) => {
  const { userId } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const user = await getUserById(userId)
  if (!user) {
    await authenticator.logout(request, { redirectTo: '/login' })
  }
  invariant(user, 'user should exist')
  invariant(user.avatar, 'User must have an avatar')

  return json({
    user: { id: user.id, nickname: user.nickname, avatar: user.avatar.medium },
  })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="p-4">
      <h1>Boardroom</h1>
      <img alt="avatar" src={user.avatar} />
      <p>Hello {user.nickname}!</p>
      <Form method="post" action="/logout">
        <button>Sign Out</button>
      </Form>
    </div>
  )
}
