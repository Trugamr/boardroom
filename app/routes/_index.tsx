import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Boardroom' }]
}

export default function Index() {
  return (
    <div>
      <h1 className="m-4">Boardroom</h1>
    </div>
  )
}
