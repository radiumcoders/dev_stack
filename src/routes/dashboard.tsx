import { authMiddleware } from '#/lib/middleware'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  server: {
    middleware: [authMiddleware],
  },
})

function RouteComponent() {
  const MotionLink = motion.create(Link)
  const item = { href: '/dashboard', label: 'Dashboard' }
  return (
    <div>
      <MotionLink
        key={item.href}
        to={item.href}
        className="group p-2 h-full w-16 md:w-20 flex items-center justify-center relative overflow-hidden shrink-0"
        initial="initial"
        whileHover="hover"
      >
        {/* TEXT */}
        <motion.span
          variants={{
            initial: { y: 0 },
            hover: { y: -2 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative z-10 text-foreground group-hover:text-primary-foreground"
        >
          {item.label}
        </motion.span>

        {/* BACKGROUND */}
        <motion.div
          variants={{
            initial: {
              y: '120%',
              scale: 0.8,
              rotate: 8,
            },
            hover: {
              y: '0%',
              scale: 1,
              rotate: 0,
            },
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="absolute inset-0 bg-primary rounded-md"
        />

        {/* OPTIONAL GLOW */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 0.15 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white blur-xl"
        />
      </MotionLink>
    </div>
  )
}
