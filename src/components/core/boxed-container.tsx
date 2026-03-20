import { cn } from '#/lib/utils'

export function BoxedContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        className,
        'h-fit border-border border my-4 bg-background p-2',
      )}
    >
      {children}
    </div>
  )
}
