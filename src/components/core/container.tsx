import { cn } from '#/lib/utils'

const CornerMarker = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute w-2 h-2 border border-border bg-border rotate-45 transform',
      className,
    )}
  />
)

export default function Container({
  children,
  className,
  corners = false,
}: {
  children: React.ReactNode
  className?: string
  corners?: boolean
}) {
  return (
    <div
      className={cn(
        'sm:max-w-7xl mx-auto border-border border-x bg-background relative overflow-hidden',
        className,
      )}
    >
      {corners && (
        <>
          <CornerMarker className="-left-1 -top-1" />
          <CornerMarker className="-right-1 -top-1" />
          <CornerMarker className="-left-1 -bottom-1" />
          <CornerMarker className="-right-1 -bottom-1" />
        </>
      )}
      {children}
    </div>
  )
}
