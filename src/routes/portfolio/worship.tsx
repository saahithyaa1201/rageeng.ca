import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/worship')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/worship"!</div>
}
