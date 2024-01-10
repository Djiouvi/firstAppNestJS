import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersEntity } from './usersEntity';

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  usersId: integer('user_id').references(() => usersEntity.id),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

