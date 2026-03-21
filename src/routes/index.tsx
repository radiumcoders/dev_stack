import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/components/core/pages/hero'
import { Cards } from '#/components/core/pages/cards'
import { Footer } from '#/components/core/footer'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Hero />
      <Cards />
      <Footer />
    </>
  )
}
