import type { Config } from 'drizzle-kit';
import { getConnectionString } from './config/database';

export default {
  driver: 'pg',
  schema: './db/schema/*',
  out: './db/drizzle',
  dbCredentials: { connectionString: getConnectionString() },
  verbose: true,
  strict: true
} satisfies Config;
