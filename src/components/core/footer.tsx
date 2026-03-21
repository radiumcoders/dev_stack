import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export function Footer() {
  const [time, setTime] = useState<string>('...')

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setTime(`${timeString} IST`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="w-full bg-background text-muted-foreground pt-12 px-6 md:px-12 flex flex-col overflow-hidden border  border-border dark">
      {/* Top Section: Copyright & Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs sm:text-sm gap-6 mb-16">
        <p>© {new Date().getFullYear()} DevStack. All Rights Reserved.</p>
      </div>

      {/* Middle Section: Info & Location */}
      <div className="flex flex-col md:flex-row justify-between items-start text-sm gap-12 z-10 relative">
        <div className="flex gap-1.5">
          inspired by{' '}
          <a
            href="https://aistack.to/"
            className="text-foreground hover:text-foreground/80"
          >
            AI Stack
          </a>
          Built by
          <a
            href="https://x.com/alperortac"
            className="text-foreground hover:text-foreground/80"
          >
            Alper Ortac
          </a>
        </div>

        <div className="flex flex-col md:text-right gap-1.5">
          <p>Based in</p>
          <p>India</p>
        </div>
      </div>

      {/* Massive Typography Section */}
      <div className="w-full flex justify-center mt-12 md:mt-0 select-none pointer-events-none">
        <h1
          className="font-bold tracking-tighter text-foreground"
          style={{
            fontSize: 'clamp(4rem, 16vw, 40rem)',
            lineHeight: '0.75',
            marginBottom: '-0.1em',
          }}
        >
          DevStack
        </h1>
      </div>
    </footer>
  )
}
