import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/institutional')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/portfolio/institutional"!</div>
}
