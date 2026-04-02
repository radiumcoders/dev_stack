import { Footer } from '#/components/core/footer'
import { Cards } from '#/components/pages/hero-components/cards'
import { Hero } from '#/components/pages/hero-components/hero'
import { createFileRoute } from '@tanstack/react-router'

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
