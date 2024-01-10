import { NotFoundException } from '@nestjs/common';
import { usersEntity } from '../../../db/schema/usersEntity';
import { getConnectionString } from '../../../config/database';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres = require('postgres');

export type User = typeof usersEntity.$inferSelect;
export type NewUser = typeof usersEntity.$inferInsert;

const migrationsClient = postgres(getConnectionString(), {
  max: 1
});
const db = drizzle(migrationsClient);

export async function insertUser(user: NewUser): Promise<User> {
  return db.insert(usersEntity).values(user).then(user => Promise.resolve(user[0]));
}

export async function findOneUser(id: number): Promise<User> {
  return db.select().from(usersEntity).where(eq(usersEntity.id, id)).then(user => {
    if (user.length == 0) {
      throw new NotFoundException(`this id ${id} doesn't exist anymore`);
    }
    return Promise.resolve(user[0]);
  });
}

export async function deleteOneUser(id: number): Promise<void> {
  await db.delete(usersEntity).where(eq(usersEntity.id, id));
}

export async function findAllUser(): Promise<User[]> {
  return db.select().from(usersEntity);
}

export async function updateUser(user: User): Promise<User> {
  if (user.id == 0) {
    throw new NotFoundException(`ID is mandatory`);
  }

  return db
    .update(usersEntity)
    .set(user)
    .where(eq(usersEntity.id, user.id))
    .returning()
    .then(user => {
      return Promise.resolve(user[0]);
    });
}
