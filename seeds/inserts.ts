import * as Knex from 'knex';
import { defaultAccounts } from './accounts.data';
import { defaultUsers } from './users.data';

export async function insertAccounts(knex: Knex): Promise<void> {
  await knex('accounts').insert(defaultAccounts);
}

export async function insertUsers(knex: Knex): Promise<void> {
  await knex('users').insert(defaultUsers);
}
