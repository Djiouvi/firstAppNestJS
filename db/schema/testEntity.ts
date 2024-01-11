import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import 'dotenv/config';

export const testEntity = pgTable('testEntity', {
  id: serial('id').primaryKey(),
  test: varchar('firstname', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow() //todo en attente https://github.com/drizzle-team/drizzle-orm/pull/1509
});
