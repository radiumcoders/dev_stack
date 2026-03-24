import { BoxedContainer } from '#/components/core/boxed-container'
import { auth } from '#/lib/auth'
import { authMiddleware } from '#/lib/middleware'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request_headers = getRequest().headers
  const session = await auth.api.getSession({ headers: request_headers })
  return session
})

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { getProfile } = await import('#/functions/profile.function')
    const { redirect } = await import('@tanstack/react-router')

    const profileResponse = await getProfile()
    if (!profileResponse.success) {
      throw redirect({
        to: '/profile/create-profile',
      })
    }
  },
  loader: async () => {
    const session = await getSession()
    return { session }
  },
  server: {
    middleware: [authMiddleware],
  },
})

function RouteComponent() {
  const { session } = Route.useLoaderData()
  const avatarUrl = session?.user.image

  // Placeholders for profile schema
  const profileData = {
    user_name: 'radiumcoders',
    bio: 'Software Engineer & Open Source Enthusiast. Building tools for developers.',
    github_url: 'https://github.com/username',
    twitter_handle: '@username',
  }

  return (
    <BoxedContainer>
      <div className="flex flex-row w-full min-h-fit gap-4 p-4 bg-background">
        {/* Left Column: Profile Card */}
        <div className="w-1/3">
          <BoxedContainer>
            <div className="bg-background rounded-none p-6 flex flex-col gap-6">
              {/* Header: Avatar + Name/Username */}
              <div className="flex flex-col items-center justify-center w-full gap-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${session?.user.name}'s avatar`}
                    className="w-20 h-20 rounded-full border-2 border-border object-cover shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-border bg-muted flex items-center justify-center text-3xl text-muted-foreground shrink-0">
                    {session?.user.name?.charAt(0) || '?'}
                  </div>
                )}

                <div className="flex flex-col text-center">
                  <h2 className="text-2xl font-bold text-foreground tracking-tight leading-none">
                    {session?.user.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    @{profileData.user_name}
                  </p>
                </div>
              </div>

              {/* Bio & Links */}
              <div className="w-full text-left">
                <p className="text-foreground text-sm mb-6 leading-relaxed">
                  {profileData.bio}
                </p>

                <div className="flex flex-col gap-3 w-full border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold">
                      Email
                    </span>
                    <span className="text-foreground">
                      {session?.user.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold">
                      GitHub
                    </span>
                    <a
                      href={profileData.github_url}
                      className="text-foreground hover:text-primary underline"
                    >
                      {profileData.github_url.split('github.com/')[1] ||
                        profileData.github_url}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold">
                      Twitter
                    </span>
                    <a
                      href={`https://twitter.com/${profileData.twitter_handle.replace('@', '')}`}
                      className="text-foreground hover:text-primary underline"
                    >
                      {profileData.twitter_handle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </BoxedContainer>
        </div>

        {/* Right Column: Stacks Area */}
        <div className="flex-1">
          <BoxedContainer>
            <div className="bg-backgorund rounded-none p-6 h-full">
              <div className="flex items-center justify-between border-b-2 border-border pb-4 mb-6">
                <h3 className="text-xl font-bold text-foreground uppercase">
                  Tech Stack
                </h3>
              </div>
              <div className="text-muted-foreground flex flex-col items-center justify-center h-68 border-2 border-border rounded-none bg-transparent">
                <p className="text-sm font-medium">STACK IMPLEMENTATION</p>
              </div>
            </div>
          </BoxedContainer>
        </div>
      </div>
    </BoxedContainer>
  )
}
