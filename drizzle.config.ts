import type { Config } from 'drizzle-kit';
import { DatabaseService } from './src/config/databaseService';

const databaseService = new DatabaseService();

export default {
  driver: 'pg',
  schema: './src/db/schema/*',
  out: './src/db/drizzle',
  dbCredentials: { connectionString: databaseService.getConnectionString() },
  verbose: true,
  strict: true
} satisfies Config;
