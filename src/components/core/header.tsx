import { AuthDialog } from '#/components/auth-components/auth-dialog'
import { authClient } from '#/lib/auth-client'
import {
  GithubLogoIcon,
  MoonIcon,
  SignOutIcon,
  SunIcon,
  XLogoIcon,
} from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import Container from './container'

export function Header() {
  const { data: session } = authClient.useSession()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const root = document.documentElement
    setTheme(root.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    const newTheme = isDark ? 'light' : 'dark'
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    root.setAttribute('data-theme', newTheme)
    root.style.colorScheme = newTheme
    window.localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const navItems = [
    {
      label: '_Stacks',
      href: '/stacks',
    },
  ]
  const MotionLink = motion.create(Link)
  const MotionButton = motion.create('button')
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-border">
      <Container
        corners
        className="h-full flex items-center justify-center md:justify-between px-4 md:px-12 gap-2 relative"
      >
        <div
          id="logo"
          className="hidden md:block text-base md:text-xl uppercase font-heading font-bold whitespace-nowrap shrink-0"
        >
          <Link to="/">Dev Stack</Link>
        </div>
        <div
          id="rignt side"
          className="text-xs uppercase font-body font-bold h-full flex items-center justify-center md:justify-end overflow-x-auto w-full md:w-auto"
        >
          {navItems.map((item) => (
            <MotionLink
              key={item.href}
              to={item.href}
              className="group p-2 h-full w-16 md:w-20 flex items-center justify-center relative overflow-hidden shrink-0"
              initial="initial"
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
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
            className="group p-2 h-full w-10 md:w-12 flex items-center justify-center relative overflow-hidden shrink-0"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
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
            className="group p-2 h-full w-10 md:w-12 flex items-center justify-center relative overflow-hidden shrink-0"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
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

          <MotionButton
            onClick={toggleTheme}
            className="group p-2 h-full w-10 md:w-12 flex items-center justify-center relative overflow-hidden cursor-pointer shrink-0"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
              {theme === 'dark' ? (
                <SunIcon size={16} weight="bold" />
              ) : (
                <MoonIcon size={16} weight="bold" />
              )}
            </span>
            <motion.div
              variants={{
                initial: { rotate: 20, y: '150%' },
                hover: { rotate: 0, y: '0%' },
              }}
              className="absolute inset-0 bg-primary"
            />
          </MotionButton>

          {session ? (
            <MotionButton
              onClick={async () => {
                await authClient.signOut()
              }}
              className="group p-2 h-full w-10 md:w-12 flex items-center justify-center relative overflow-hidden cursor-pointer shrink-0"
              initial="initial"
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                <SignOutIcon size={16} weight="bold" />
              </span>
              <motion.div
                variants={{
                  initial: { rotate: 20, y: '150%' },
                  hover: { rotate: 0, y: '0%' },
                }}
                className="absolute inset-0 bg-primary"
              />
            </MotionButton>
          ) : (
            <AuthDialog />
          )}
        </div>
      </Container>
    </header>
  )
}
