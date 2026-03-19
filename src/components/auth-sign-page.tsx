import { AuthDivider } from '#/components/auth-divider'
import { Button } from '#/components/ui/button'
import { DecorIcon } from '#/components/ui/decor-icon'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group'
import { authClient } from '#/lib/auth-client'
import { cn } from '#/lib/utils'
import {
  GithubLogoIcon,
  GoogleLogoIcon,
  PasswordIcon,
  SignInIcon,
} from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form-start'
import { toast } from 'sonner'
import { z } from 'zod'

export function AuthPage() {
  const formSchema = z.object({
    email: z.email('invalid email address'),
    password: z.string().min(8),
    name: z.string().min(1),
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
        callbackURL: '/',
      })
      if (error) {
        toast.error(error.message)
        return
      }
      toast.success('Logged in successfully')
      form.reset()
    },
  })
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-8">
      <div
        className={cn(
          'relative flex w-full max-w-sm flex-col justify-between p-6 md:p-8',
          'dark:bg-[radial-gradient(50%_80%_at_20%_0%,--theme(--color-foreground/.1),transparent)]',
        )}
      >
        <div className="absolute -inset-y-6 -left-px w-px bg-border" />
        <div className="absolute -inset-y-6 -right-px w-px bg-border" />
        <div className="absolute -inset-x-6 -top-px h-px bg-border" />
        <div className="absolute -inset-x-6 -bottom-px h-px bg-border" />
        <DecorIcon position="top-left" />
        <DecorIcon position="bottom-right" />

        <div className="w-full max-w-sm animate-in space-y-8">
          <div className="flex flex-col space-y-1">
            <h1 className="font-bold text-2xl tracking-wide font-heading">
              Join Now!
            </h1>
            <p className="text-base text-muted-foreground">
              create your _devStack account.
            </p>
          </div>
          <div className="space-y-4">
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              <form.Field name="name">
                {(field) => (
                  <InputGroup>
                    <InputGroupInput
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tony Stark"
                      type="text"
                    />
                    <InputGroupAddon align="inline-start">
                      <SignInIcon size={16} weight="bold" />
                    </InputGroupAddon>
                  </InputGroup>
                )}
              </form.Field>
              <form.Field name="email">
                {(field) => (
                  <InputGroup>
                    <InputGroupInput
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="your.email@example.com"
                      type="email"
                    />
                    <InputGroupAddon align="inline-start">
                      <SignInIcon size={16} weight="bold" />
                    </InputGroupAddon>
                  </InputGroup>
                )}
              </form.Field>
              <form.Field name="password">
                {(field) => (
                  <InputGroup>
                    <InputGroupInput
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Don't Look ***********"
                      type="password"
                    />
                    <InputGroupAddon align="inline-start">
                      <PasswordIcon size={16} weight="bold" />
                    </InputGroupAddon>
                  </InputGroup>
                )}
              </form.Field>

              <Button className="w-full" size="sm" type="submit">
                Continue With Email
              </Button>
            </form>
            <AuthDivider>OR</AuthDivider>
            <div className="grid grid-cols-2 gap-2 space-y-2">
              <Button className="w-full" type="button" variant="outline">
                <GoogleLogoIcon size={16} weight="bold" />
                Google
              </Button>
              <Button className="w-full" type="button" variant="outline">
                <GithubLogoIcon size={16} weight="bold" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
