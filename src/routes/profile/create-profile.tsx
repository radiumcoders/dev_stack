import { BoxedContainer } from '#/components/core/boxed-container'
import { auth } from '#/lib/auth'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request_headers = getRequest().headers
  const session = await auth.api.getSession({ headers: request_headers })
  return session
})
export const Route = createFileRoute('/profile/create-profile')({
  beforeLoad: async () => {
    const { getProfile } = await import('#/functions/profile.function')
    const { redirect } = await import('@tanstack/react-router')

    const profileResponse = await getProfile()
    if (profileResponse.success) {
      throw redirect({
        to: '/profile',
      })
    }
  },
  loader: async () => {
    const session = await getSession()
    return { session }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <BoxedContainer>
      <form action=""></form>
    </BoxedContainer>
  )
}
