import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { authClient } from '#/lib/auth-client'
import { GithubLogoIcon, SignInIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useState } from 'react'
import { motion } from 'motion/react'

export function AuthDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const MotionButton = motion.create('button')

  const handleGithubLogin = async () => {
    setIsLoading(true)
    const { error } = await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    })

    if (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <MotionButton
            className="group p-2 h-full w-10 md:w-12 flex items-center justify-center relative overflow-hidden cursor-pointer shrink-0"
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        }
      >
        <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
          <SignInIcon size={16} weight="bold" />
        </span>
        <motion.div
          variants={{
            initial: { rotate: 20, y: '150%' },
            hover: { rotate: 0, y: '0%' },
          }}
          className="absolute inset-0 bg-primary"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome to _devStack</DialogTitle>
          <DialogDescription>
            Sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleGithubLogin}
            disabled={isLoading}
          >
            <GithubLogoIcon size={16} weight="bold" />
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
