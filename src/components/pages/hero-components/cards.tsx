import { BoxedContainer } from '#/components/core/boxed-container'
import { useEffect, useState } from 'react'

const GithubSquares = () => {
  const numSquares = 250
  const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Initial random state
    const initial = new Set<number>()
    for (let i = 0; i < numSquares; i++) {
      if (Math.random() > 0.6) initial.add(i)
    }
    setActiveSquares(initial)

    // Periodically change some squares
    const interval = setInterval(() => {
      setActiveSquares((prev) => {
        const next = new Set(prev)
        // Flip a few random squares
        const numToFlip = Math.floor(Math.random() * 5) + 1
        for (let i = 0; i < numToFlip; i++) {
          const idx = Math.floor(Math.random() * numSquares)
          if (next.has(idx)) {
            next.delete(idx)
          } else {
            next.add(idx)
          }
        }
        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const squares = Array.from({ length: numSquares })
  return (
    <div className="w-full h-full flex flex-wrap content-start justify-center gap-1.5 p-6 overflow-hidden">
      {squares.map((_, i) => {
        const isActive = activeSquares.has(i)

        return (
          <div
            key={i}
            className={`w-5 h-5 rounded-none transition-colors duration-700 ${
              isActive ? 'bg-primary/70' : 'bg-primary/20'
            }`}
          />
        )
      })}
    </div>
  )
}

const Triangles = () => {
  const numTriangles = 250
  const [activeTriangles, setActiveTriangles] = useState<Set<number>>(new Set())

  useEffect(() => {
    const initial = new Set<number>()
    for (let i = 0; i < numTriangles; i++) {
      if (Math.random() > 0.5) initial.add(i)
    }
    setActiveTriangles(initial)

    const interval = setInterval(() => {
      setActiveTriangles((prev) => {
        const next = new Set(prev)
        const numToFlip = Math.floor(Math.random() * 5) + 1
        for (let i = 0; i < numToFlip; i++) {
          const idx = Math.floor(Math.random() * numTriangles)
          if (next.has(idx)) next.delete(idx)
          else next.add(idx)
        }
        return next
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const motif = ['straight', 'flipped', 'flipped', 'straight', 'straight']
  const triangles = Array.from({ length: numTriangles })

  return (
    <div className="w-full h-full flex flex-wrap content-start justify-center gap-1.5 p-6 overflow-hidden">
      {triangles.map((_, i) => {
        const dir = motif[i % motif.length]
        const isActive = activeTriangles.has(i)
        const colorClass = isActive ? 'text-primary/70' : 'text-primary/20'

        return (
          <svg
            key={i}
            viewBox="0 0 100 100"
            className={`w-5 h-5 transition-colors duration-700 fill-current ${colorClass} ${
              dir === 'flipped' ? 'rotate-180' : ''
            }`}
          >
            <polygon points="50,0 100,100 0,100" />
          </svg>
        )
      })}
    </div>
  )
}

const CirclesGrid = () => {
  const numCircles = 250
  const [activeCircles, setActiveCircles] = useState<Set<number>>(new Set())

  useEffect(() => {
    const initial = new Set<number>()
    for (let i = 0; i < numCircles; i++) {
      if (Math.random() > 0.6) initial.add(i)
    }
    setActiveCircles(initial)

    const interval = setInterval(() => {
      setActiveCircles((prev) => {
        const next = new Set(prev)
        const numToFlip = Math.floor(Math.random() * 5) + 1
        for (let i = 0; i < numToFlip; i++) {
          const idx = Math.floor(Math.random() * numCircles)
          if (next.has(idx)) next.delete(idx)
          else next.add(idx)
        }
        return next
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const circles = Array.from({ length: numCircles })

  return (
    <div className="w-full h-full flex flex-wrap content-start justify-center gap-1.5 p-6 overflow-hidden">
      {circles.map((_, i) => {
        const isActive = activeCircles.has(i)
        return (
          <div
            key={i}
            className={`w-5 h-5 rounded-full transition-colors duration-700 ${
              isActive ? 'bg-primary/70' : 'bg-primary/20'
            }`}
          />
        )
      })}
    </div>
  )
}

export function Cards() {
  const cards = [
    {
      title: 'Copy',
      description:
        'Copy the modern tech stack used by fast shipping developers to jumpstart your project.',
      skeleton: <Triangles />,
    },
    {
      title: 'Build',
      description:
        'Build with confidence using best practices and scalable architecture to create powerful apps.',
      skeleton: <GithubSquares />,
    },
    {
      title: 'Ship',
      description:
        'Ship products faster and streamline your deployment to stay ahead of the competition.',
      skeleton: <CirclesGrid />,
    },
  ]
  return (
    <BoxedContainer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="h-full flex flex-col border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="h-32 w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
              {card.skeleton}
            </div>
            <div className="flex-1 w-full p-8 flex flex-col items-center justify-center text-center border-y border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-4xl uppercase font-heading">
                  {card.title}
                </h3>
                <p className="text-base text-neutral-500 mt-3 overflow-hidden">
                  {card.description}
                </p>
              </div>
            </div>
            <div className="h-32 w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden rotate-180">
              {card.skeleton}
            </div>
          </div>
        ))}
      </div>
    </BoxedContainer>
  )
}
