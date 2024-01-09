import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { getConnectionString } from '../../config/database';
import postgres = require('postgres');

const migrationsClient = postgres(getConnectionString(), {
  max: 1
});
const db = drizzle(migrationsClient);

const migrateAsync = async (): Promise<void> => {
  await migrate(db, { migrationsFolder: 'db/drizzle' });
};

const sqlEnd = async (): Promise<void> => {
  await migrationsClient.end();
};

migrateAsync()
  .then(sqlEnd)
  .catch(sqlEnd);
