import faker from 'faker';

import { identifiers as accountIdentifiers } from './accounts.data';

export const identifiers = {
  root: 'b25c34a5-4435-4b85-bb8e-78b683c6488c',
  admin: '76228b09-c897-4228-8b12-e7c31d6073ae',
  test: 'be41eb21-8a37-4c9a-b41a-175bbc50b0e8',
};

export const createUserDataObject = (accountId: string) => ({
  id: faker.random.uuid(),
  account_id: accountId,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
});

export const defaultUsers = [
  {
    ...createUserDataObject(accountIdentifiers.test),
    id: identifiers.root,
  },
  {
    ...createUserDataObject(accountIdentifiers.test),
    id: identifiers.admin,
  },
  {
    ...createUserDataObject(accountIdentifiers.test),
    id: identifiers.test,
  },
];
