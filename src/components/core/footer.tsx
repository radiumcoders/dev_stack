import { HeartIcon } from '@phosphor-icons/react'

export function Footer() {
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
          Which is Built by
          <a
            href="https://x.com/alperortac"
            className="text-foreground hover:text-foreground/80"
          >
            Alper Ortac
          </a>
        </div>
        <p className="flex items-center gap-1">
          Built with <HeartIcon weight="fill" size={16} /> by RadiumCoders
        </p>
      </div>

      {/* Massive Typography Section */}
      <div className="w-full flex justify-center mt-12 md:mt-0 select-none pointer-events-none">
        <h1
          className="font-bold tracking-tighter text-foreground font-heading"
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
