import type { LoaderArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
}

export default function Login() {
  return (
    <div className="p-4">
      <Form method="get" action="/auth/steam">
        <button>Sign In using Steam</button>
      </Form>
    </div>
  )
}
