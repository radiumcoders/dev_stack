import { BoxedContainer } from '#/components/core/boxed-container'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <BoxedContainer>
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center">
          <h1 className=" text-7xl sm:text-8xl md:text-8xl lg:text-9xl font-heading text-center mt-16 mb-12">
            <span className="bg-primary text-background px-2 inline-block -rotate-[4deg] leading-none mr-2 md:mr-4">
              COPY
            </span>
            EXACTLY WHAT REAL BUILDERS USE TO{' '}
            <span className="bg-primary text-background px-2 inline-block rotate-[4deg] leading-none mb-4 md:mb-0">
              SHIP
            </span>
          </h1>
          <div className="flex gap-4">
            <Button variant="default" className="py-6 px-8 text-xl">
              See Stacks
            </Button>
            <Button variant="outline" className="py-6 px-8 text-xl">
              Publish Stack
            </Button>
          </div>
        </div>
      </BoxedContainer>
      <div className="h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-heading">Welcome to _devStack</h1>
      </div>
    </>
  )
}
