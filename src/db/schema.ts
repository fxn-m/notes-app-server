import {
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const notebooks = pgTable('notebooks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  notebookId: integer('notebook_id')
    .notNull()
    .references(() => notebooks.id, { onDelete: 'cascade' }),
  xPercent: real('x_percent').notNull(),
  yPercent: real('y_percent').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
