import { env } from 'process';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres = require('postgres');

export class DatabaseService {

  private _db: PostgresJsDatabase;

  get db(): PostgresJsDatabase {
    return this._db;
  }

  set db(value: PostgresJsDatabase) {
    this._db = value;
  }

  constructor() {
    this._db = this.initDrizzleConnexion();
  }

  private initDrizzleConnexion(): PostgresJsDatabase {
    const migrationsClient = postgres(this.getConnectionString(), {
      max: 1
    });
    return drizzle(migrationsClient);
  }

  public getConnectionString(): string {
    return `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DATABASE}`;
  }
}
