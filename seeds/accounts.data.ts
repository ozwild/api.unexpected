import faker from 'faker';
import Knex from 'knex';

enum accountStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export const identifiers = {
  test: '2363d051-1d4b-431b-833e-21b1010077b2',
};

export const createAccountDataObject = () => ({
  id: identifiers.test,
  name: faker.company.companyName,
  status: accountStatus.Inactive,
});

export const defaultAccounts = [
  {
    ...createAccountDataObject(),
    id: identifiers.test,
  },
];

export const insertDefaultAccounts = (knex: Knex) => {
    await knex('accounts').insert();
}