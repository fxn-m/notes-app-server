import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const notebooks = pgTable("notebooks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});