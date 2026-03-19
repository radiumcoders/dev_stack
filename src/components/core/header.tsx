import { Link } from '@tanstack/react-router'
import Container from './container'
import { motion } from 'motion/react'
import { GithubLogoIcon, XLogoIcon } from '@phosphor-icons/react'

export function Header() {
  const navItems = [
    {
      label: '_Stacks',
      href: '/stacks',
    },
  ]
  const MotionLink = motion.create(Link)
  return (
    <header className="h-16 w-full border-border border-b">
      <Container className=" h-full flex items-center justify-between">
        <div id="logo" className="text-2xl uppercase font-heading font-bold">
          <Link to="/">_DevStack</Link>
        </div>
        <div
          id="rignt side"
          className="text-xs uppercase font-body font-bold h-full flex items-center justify-center"
        >
          {navItems.map((item) => (
            <MotionLink
              key={item.href}
              to={item.href}
              className="p-2 h-full size-20 flex items-center justify-center relative overflow-hidden"
              initial="initial"
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="relative z-10 mix-blend-difference text-white">
                {item.label}
              </span>
              <motion.div
                variants={{
                  initial: {
                    rotate: 20,
                    y: '150%',
                  },
                  hover: {
                    rotate: 0,
                    y: '0%',
                  },
                }}
                className="absolute inset-0 bg-primary"
              />
            </MotionLink>
          ))}
          <MotionLink
            to={'https://github.com/radiumcoders/dev_stack'}
            className="p-2 h-full size-12 flex items-center justify-center relative overflow-hidden"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10 mix-blend-difference text-white">
              <GithubLogoIcon size={16} weight="bold" />
            </span>
            <motion.div
              variants={{
                initial: {
                  rotate: 20,
                  y: '150%',
                },
                hover: {
                  rotate: 0,
                  y: '0%',
                },
              }}
              className="absolute inset-0 bg-primary"
            />
          </MotionLink>
          <MotionLink
            to={'https://x.com/radiumcoders'}
            className="p-2 h-full size-12 flex items-center justify-center relative overflow-hidden"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10 mix-blend-difference text-white">
              <XLogoIcon size={16} weight="bold" />
            </span>
            <motion.div
              variants={{
                initial: {
                  rotate: 20,
                  y: '150%',
                },
                hover: {
                  rotate: 0,
                  y: '0%',
                },
              }}
              className="absolute inset-0 bg-primary"
            />
          </MotionLink>
        </div>
      </Container>
    </header>
  )
}
