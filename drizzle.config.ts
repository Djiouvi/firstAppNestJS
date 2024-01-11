import type { Config } from 'drizzle-kit';
import { DatabaseService } from './config/databaseService';

const databaseService = new DatabaseService();

export default {
  driver: 'pg',
  schema: './db/schema/*',
  out: './db/drizzle',
  dbCredentials: { connectionString: databaseService.getConnectionString() },
  verbose: true,
  strict: true
} satisfies Config;
