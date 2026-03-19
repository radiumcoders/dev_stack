import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '#/components/auth-sign-page'

export const Route = createFileRoute('/auth/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthPage />
}
