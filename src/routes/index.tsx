import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/components/pages/hero-components/hero'
import { Cards } from '#/components/pages/hero-components/cards'
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
