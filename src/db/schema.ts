import {
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { sql } from 'drizzle-orm'

export const notebooks = pgTable('notebooks', {
  id: uuid('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const notes = pgTable('notes', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  notebookId: uuid('notebook_id')
    .notNull()
    .references(() => notebooks.id, { onDelete: 'cascade' }),
  xPercent: real('x_percent').notNull(),
  yPercent: real('y_percent').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
