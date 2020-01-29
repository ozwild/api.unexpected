import { Model, RelationMappings } from 'objection';
import { IAccount } from '../accounts/interfaces';
import BaseModel from './base-model';
import { UserModel } from './user.model';

export class AccountModel extends BaseModel implements IAccount {
  static tableName = 'accounts';

  id!: string;
  name: string;

  users?: Array<Partial<UserModel>>;

  static relationMappings: RelationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/user.model`,
      join: {
        from: 'accounts.id',
        to: 'users.accountId',
      },
    },
  };
}
