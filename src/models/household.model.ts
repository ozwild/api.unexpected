import { Model, RelationMappings } from 'objection';
import BaseModel from './base-model';

import { HouseholdStatus } from '../households/interfaces/household.interface';

import { UserModel } from './user.model';
import { AccountModel } from './account.model';

export class HouseholdModel extends BaseModel {
  static tableName = 'households';

  id!: string;
  accountId!: string;
  name: string;
  address: string;
  phone: string;

  status: HouseholdStatus;

  account?: Partial<AccountModel>;
  members?: Array<Partial<UserModel>>;

  static relationMappings: RelationMappings = {
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/account.model`,
      join: {
        from: 'users.accountId',
        to: 'accounts.id',
      },
    },
    members: {
      relation: Model.HasManyRelation,
      modelClass: 'user.model',
      join: {
        from: 'households.id',
        to: 'users.householdId',
      },
    },
  };
}
