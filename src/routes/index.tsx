import ThemeToggle from '#/components/ThemeToggle'
import { getHello } from '#/functions/hello.functions'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['hello'],
    queryFn: getHello,
  })
  // const data = Route.useLoaderData()
  return (
    <>
      <Link to="/auth/signIn" viewTransition>
        signIn
      </Link>
      <Link to="/auth/Login" viewTransition>
        Login
      </Link>
      <ThemeToggle />
      <h1 className="text-4xl font-heading">Welcome to _devStack</h1>
      {isLoading ? <div>Loading...</div> : <pre>{data}</pre>}
    </>
  )
}
