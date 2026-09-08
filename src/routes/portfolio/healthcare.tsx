import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/healthcare')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/healthcare"!</div>
}
