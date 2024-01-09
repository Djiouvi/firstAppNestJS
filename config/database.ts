import { Client } from 'pg';
import { env } from 'process';

export default async () => {
  const client = new Client(getConnectionString());

  await client.connect();
}

export function getConnectionString(): string {
  return `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DATABASE}`;
}
