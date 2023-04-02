import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Boardroom' }]
}

export let loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  return json({ user })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="p-4">
      <h1>Boardroom</h1>
      <img alt="avatar" src={user.avatar.medium} />
      <p>Hello {user.nickname}!</p>
      <Form method="post" action="/logout">
        <button>Sign Out</button>
      </Form>
    </div>
  )
}
