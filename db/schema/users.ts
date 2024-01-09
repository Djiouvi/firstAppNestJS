import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { getConnectionString } from '../../config/database';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import 'dotenv/config';
import postgres = require('postgres');
import { NotFoundException } from '@nestjs/common';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  age: integer('age'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(), //todo en attente https://github.com/drizzle-team/drizzle-orm/pull/1509
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

const migrationsClient = postgres(getConnectionString(), {
  max: 1
});
const db = drizzle(migrationsClient);

export async function insertUser(user: NewUser): Promise<User> {
  return db.insert(users).values(user).then(user => Promise.resolve(user[0]));
}

export async function findOneUser(id: number): Promise<User> {
  return db.select().from(users).where(eq(users.id, id)).then(user => {
    if (user.length == 0) {
      throw new NotFoundException(`this id ${id} doesn't exist anymore`);
    }
    return Promise.resolve(user[0]);
  });
}

export async function deleteOneUser(id: number): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}

export async function findAllUser(): Promise<User[]> {
  return db.select().from(users);
}

export async function updateUser(user: User): Promise<User> {
  if(user.id == 0) {
    throw new NotFoundException(`ID is mandatory`);
  }

  return db
    .update(users)
    .set(user)
    .then(user => Promise.resolve(user[0]));
}


