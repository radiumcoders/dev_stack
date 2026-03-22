import { db } from '#/db'
import { profile } from '#/db/schema'
import { auth } from '#/lib/auth'
import type { ServerResponse } from '#/types/return.type'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'
import z from 'zod'

const ProfileSchemaZod = z.object({
  user_name: z.string(),
  bio: z.string(),
  github_url: z.string(),
  twitter_handle: z.string(),
})

export const createProfile = createServerFn({ method: 'POST' })
  .inputValidator(ProfileSchemaZod)
  .handler(async ({ data }): Promise<ServerResponse> => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }
    const session_user_id = session.user.id

    const user_avatar = session.user.image

    try {
      await db.insert(profile).values({
        user_id: session_user_id,
        user_name: data.user_name,
        bio: data.bio,
        github_url: data.github_url,
        twitter_handle: data.twitter_handle,
        avatar_url: user_avatar,
      })
    } catch {
      return { success: false, error: 'Failed to create profile' }
    }
    return {
      success: true,
      error: null,
    }
  })

export const getProfile = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ServerResponse<typeof profile.$inferSelect>> => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }
    const session_user_id = session.user.id
    const profileTable = await db
      .select()
      .from(profile)
      .where(eq(profile.user_id, session_user_id))
      .catch(() => [])
    if (profileTable.length === 0) {
      return {
        success: false,
        error: 'Profile not found',
      }
    }
    return {
      success: true,
      error: null,
      data: profileTable[0],
    }
  },
)

export const updateProfile = createServerFn({ method: 'POST' })
  .inputValidator(ProfileSchemaZod)
  .handler(async ({ data }): Promise<ServerResponse> => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }
    const session_user_id = session.user.id
    try {
      await db
        .update(profile)
        .set({
          user_name: data.user_name,
          bio: data.bio,
          github_url: data.github_url,
          twitter_handle: data.twitter_handle,
        })
        .where(eq(profile.user_id, session_user_id))
    } catch {
      return { success: false, error: 'Failed to update profile' }
    }
    return {
      success: true,
      error: null,
    }
  })
