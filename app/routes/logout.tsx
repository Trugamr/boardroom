import type { ActionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const action = async ({ request }: ActionArgs) => {
  return await authenticator.logout(request, {
    redirectTo: '/login',
  })
}

export default function Logout() {
  return (
    <div className="p-4">
      <p>Are you sure you want to sign out?</p>
      <Form method="post">
        <button>Sign Out</button>
      </Form>
    </div>
  )
}
