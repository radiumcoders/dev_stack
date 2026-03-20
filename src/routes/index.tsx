import { BoxedContainer } from '#/components/core/boxed-container'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { HeroGrid } from '#/components/core/hero-grid'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <BoxedContainer>
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center relative overflow-hidden">
          <HeroGrid />
          <motion.h1
            initial={{ textShadow: '0px 0px 0px var(--shadow-color)' }}
            animate={{ textShadow: '3px 3px 0px var(--shadow-color)' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 10,
              delay: 0.1,
            }}
            className="relative z-10 text-6xl sm:text-8xl lg:text-9xl font-heading text-center mt-8 sm:mt-16 mb-8 sm:mb-12 px-4 [--shadow-color:#94a3b8] dark:[--shadow-color:#334155]"
          >
            <span className="px-2 inline-block -rotate-[4deg] leading-none mr-2 md:mr-4 sm:mb-0">
              STEAL
            </span>
            THE EXACT STACKS REAL DEVELOPERS USE TO{' '}
            <span className="px-2 inline-block rotate-[4deg] leading-none ml-1 sm:ml-2 mt-2 sm:mt-0">
              SCALE
            </span>
          </motion.h1>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button
              variant="default"
              className="w-full sm:w-auto py-6 px-8 text-xl"
            >
              See Stacks
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto py-6 px-8 text-xl"
            >
              Publish Stack
            </Button>
          </div>
        </div>
      </BoxedContainer>
    </>
  )
}
