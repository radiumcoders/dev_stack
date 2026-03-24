import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/create-profile')({
  beforeLoad: async () => {
    // TODO: Implement actual profile existence check
    const profileExists = false
    if (profileExists) {
      throw redirect({
        to: '/profile',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/create-profile"!</div>
}
