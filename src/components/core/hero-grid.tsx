import { cn } from '#/lib/utils'

export function HeroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden',
        className,
      )}
      style={{
        maskImage: 'linear-gradient(to top, black 0%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 80%)',
      }}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px),
            repeating-conic-gradient(var(--muted) 0% 25%, transparent 0% 50%)
          `,
          backgroundSize: '64px 64px, 64px 64px, 128px 128px',
          backgroundPosition: 'center center',
          opacity: 0.8,
        }}
      />
    </div>
  )
}
