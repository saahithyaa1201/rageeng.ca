import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/offices')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/offices"!</div>
}
