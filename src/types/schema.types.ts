import { z } from 'zod'

export type ProfileSchemaZod = z.infer<typeof profileSchema>

const profileSchema = z.object({
  user_id: z.string(),
  user_name: z.string().min(3),
  bio: z.string().max(160),
  github_url: z.url(),
  twitter_handle: z.string().min(3),
  avatar_url: z.url(),
})
