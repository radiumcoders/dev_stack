import { BoxedContainer } from '#/components/core/boxed-container'
import { auth } from '#/lib/auth'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { useForm } from '@tanstack/react-form'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Button } from '#/components/ui/button'
import React from 'react'

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request_headers = getRequest().headers
  const session = await auth.api.getSession({ headers: request_headers })
  return session
})
export const Route = createFileRoute('/profile/create-profile')({
  beforeLoad: async () => {
    const { getProfile } = await import('#/functions/profile.function')
    const { redirect } = await import('@tanstack/react-router')

    const profileResponse = await getProfile()
    if (profileResponse.success) {
      throw redirect({
        to: '/profile',
      })
    }
  },
  loader: async () => {
    const session = await getSession()
    return { session }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      user_name: '',
      bio: '',
      github_url: '',
      twitter_handle: '',
      avatar_url: '',
    },
    onSubmit: async ({ value }) => {
      // Handle submission
      //
    },
  })

  return (
    <BoxedContainer>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="user_name"
          children={(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Username</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
                placeholder="johndoe"
              />
              {field.state.meta.errors ? (
                <span className="text-xs text-destructive">
                  {field.state.meta.errors.join(', ')}
                </span>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="bio"
          children={(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Bio</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
                placeholder="Tell us about yourself"
              />
              {field.state.meta.errors ? (
                <span className="text-xs text-destructive">
                  {field.state.meta.errors.join(', ')}
                </span>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="github_url"
          children={(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>GitHub URL</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
                placeholder="https://github.com/johndoe"
              />
            </div>
          )}
        />

        <form.Field
          name="twitter_handle"
          children={(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Twitter Handle</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
                placeholder="@johndoe"
              />
            </div>
          )}
        />

        <form.Field
          name="avatar_url"
          children={(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Avatar URL</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: any) => field.handleChange(e.target.value)}
                placeholder="https://example.com/avatar.png"
              />
            </div>
          )}
        />

        <Button type="submit" className="mt-4 w-full">
          Create Profile
        </Button>
      </form>
    </BoxedContainer>
  )
}
