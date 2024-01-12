import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import 'dotenv/config';
import { z } from 'zod';

export const usersEntity = pgTable('users', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  age: integer('age'),
  username: varchar('username'),
  // password:
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow() //todo en attente https://github.com/drizzle-team/drizzle-orm/pull/1509
});

const usersEntitySchemaValidation = z
  .object({
    id: z.number().gt(0).optional(),
    firstname: z.string(),
    lastname: z.string(),
    age: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
  });

export const requiredUserValidation = usersEntitySchemaValidation.required(
  {
    firstname: true,
    lastname: true,
    age: true
  }
);

// export type UserDto = z.infer<typeof requiredUserValidation>;
