import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { DatabaseService } from '../../config/databaseService';
import postgres = require('postgres');


const runMigrations = async (): Promise<void> => {
  const databaseService = new DatabaseService();
  const migrationsClient = postgres(databaseService.getConnectionString(), {
    max: 1
  });

  const db = drizzle(migrationsClient);

  try {
    await migrate(db, { migrationsFolder: 'db/drizzle' });
  } finally {
    await migrationsClient.end();
  }
};

runMigrations().catch(error => {
  console.error('Error during migration:', error);
});
