import { registerAs } from '@nestjs/config';
import { Config } from 'knex';

export interface DatabaseConfig {
  host: string;
  port: number;
}

export const loadKnexConfigFromEnv = (): Config => ({
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  migrations: {
    tableName: process.env.DATABASE_MIGRATION_TABLE_NAME || 'knex_migrations',
    extension: 'ts',
  },
  pool: {
    min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 2,
    max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 10,
  },
});

export default registerAs('database', loadKnexConfigFromEnv);
