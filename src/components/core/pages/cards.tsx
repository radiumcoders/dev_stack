import { BoxedContainer } from '#/components/core/boxed-container'
import { useEffect, useState } from 'react'

const GithubSquares = () => {
  const numSquares = 126 // 14 cols * 9 rows
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
    <div className="w-full h-full grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(9,1fr)] gap-1.5 p-2">
      {squares.map((_, i) => {
        const isActive = activeSquares.has(i)

        return (
          <div
            key={i}
            className={`w-full h-full rounded-none transition-colors duration-700 ${
              isActive
                ? 'bg-neutral-400 dark:bg-neutral-600'
                : 'bg-neutral-200 dark:bg-neutral-800'
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
        'Copy the modern technology stack used by the fastest shipping developers. Leverage proven tools and configurations to jumpstart your next big project without reinventing the wheel or wasting time on initial setup.',
      skeleton: <></>,
    },
    {
      title: 'Build',
      description:
        'Build with absolute confidence around your chosen stack. Utilize best practices, scalable architecture, and robust integrations to create powerful applications that can easily grow alongside your business needs and user demands.',
      skeleton: <GithubSquares />,
    },
    {
      title: 'Ship',
      description:
        'Ship your products faster and more reliably than ever before. Streamline your deployment pipeline and deliver exceptional experiences to your users with lightning speed, ensuring you stay ahead of the competition.',
      skeleton: <></>,
    },
  ]
  return (
    <BoxedContainer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="h-[32rem] flex flex-col border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="h-2/3 w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
              {card.skeleton}
            </div>
            <div className="h-1/3 w-full p-4 flex flex-col items-start justify-between">
              <div className="flex flex-col">
                <h3 className="font-semibold text-3xl uppercase font-heading">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BoxedContainer>
  )
}
