import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/restaurants')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/restaurants"!</div>
}
