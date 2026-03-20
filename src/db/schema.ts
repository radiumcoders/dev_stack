import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  pgEnum,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)],
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

// better schema ends

export const profile = pgTable('profile', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text('user_id').references(() => user.id, { onDelete: 'set null' }), //text text fk > user.id
  user_name: text('user_name').unique(), // username text
  bio: text('bio'), // bio text
  github_url: text('github_url'),
  twitter_handle: text('twitter_handle'),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export const stackEnum = pgEnum('stack_type', ['personal_go_to', 'project'])

export const stack = pgTable('stack', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: stackEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  user_id: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  upvotes: integer('upvotes').default(0).notNull(),
  published: boolean('published').default(false).notNull(),
  slug: text('slug').unique().notNull(),
})

export const tools = pgTable('tool', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
})

export const stackTools = pgTable(
  'stack_tools',
  {
    stack_id: text('stack_id')
      .notNull()
      .references(() => stack.id, { onDelete: 'cascade' }),
    tool_id: text('tool_id')
      .notNull()
      .references(() => tools.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.stack_id, table.tool_id] })],
)

export const categories = pgTable('category', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
})

export const stackCategories = pgTable(
  'stack_categories',
  {
    stack_id: text('stack_id')
      .notNull()
      .references(() => stack.id, { onDelete: 'cascade' }),
    category_id: text('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.stack_id, table.category_id] })],
)

export const upvotes = pgTable(
  'upvote',
  {
    stack_id: text('stack_id')
      .notNull()
      .references(() => stack.id, { onDelete: 'cascade' }),
    user_id: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.stack_id, table.user_id] })],
)

export const comments = pgTable('comment', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  stack_id: text('stack_id')
    .notNull()
    .references(() => stack.id, { onDelete: 'cascade' }),
  parent_id: text('parent_id').references((): AnyPgColumn => comments.id, {
    onDelete: 'cascade',
  }),
  body: text('body').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.user_id],
    references: [user.id],
  }),
}))

export const stackRelations = relations(stack, ({ one, many }) => ({
  user: one(user, {
    fields: [stack.user_id],
    references: [user.id],
  }),
  tools: many(stackTools),
  categories: many(stackCategories),
  upvotes: many(upvotes),
  comments: many(comments),
}))

export const toolsRelations = relations(tools, ({ many }) => ({
  stacks: many(stackTools),
}))

export const stackToolsRelations = relations(stackTools, ({ one }) => ({
  stack: one(stack, {
    fields: [stackTools.stack_id],
    references: [stack.id],
  }),
  tool: one(tools, {
    fields: [stackTools.tool_id],
    references: [tools.id],
  }),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  stacks: many(stackCategories),
}))

export const stackCategoriesRelations = relations(
  stackCategories,
  ({ one }) => ({
    stack: one(stack, {
      fields: [stackCategories.stack_id],
      references: [stack.id],
    }),
    category: one(categories, {
      fields: [stackCategories.category_id],
      references: [categories.id],
    }),
  }),
)

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  stack: one(stack, {
    fields: [upvotes.stack_id],
    references: [stack.id],
  }),
  user: one(user, {
    fields: [upvotes.user_id],
    references: [user.id],
  }),
}))

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(user, {
    fields: [comments.user_id],
    references: [user.id],
  }),
  stack: one(stack, {
    fields: [comments.stack_id],
    references: [stack.id],
  }),
  parent: one(comments, {
    fields: [comments.parent_id],
    references: [comments.id],
  }),
  replies: many(comments),
}))
