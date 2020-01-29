/* tslint:disable:no-console */
import Knex from 'knex';
import * as knexConfig from '../knexfile';

const env = process.env.NODE_ENV || 'localhost';
const knex = Knex(knexConfig[env]);

async function dropDatabase(): Promise<void> {
  // https://www.postgresql.org/docs/current/static/sql-drop-owned.html
  await knex.raw('DROP OWNED BY CURRENT_USER CASCADE;');
  await knex.raw('CREATE SCHEMA IF NOT EXISTS public;');
}

async function run(): Promise<void> {
  console.log('Cleaning up all tables, enums, indexes and sequences in database');

  try {
    await dropDatabase();
    console.log('Cleanup finished!');
    process.exit();
  } catch (err) {
    console.error('Error cleaning up the database', err);
    process.exit(1);
  }
}

run();
