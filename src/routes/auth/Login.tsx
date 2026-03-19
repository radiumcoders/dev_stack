import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '#/components/auth-login-page'

export const Route = createFileRoute('/auth/Login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthPage />
}
