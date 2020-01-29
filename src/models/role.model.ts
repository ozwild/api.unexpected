import { Model, RelationMappings } from 'objection';

import BaseModel from './base-model';

export class RoleModel extends BaseModel {
  static tableName = 'roles';

  id: string;
  uniqueName: string;
  name: string;

  static relationMappings: RelationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: `user.model`,
      join: {
        from: 'roles.id',
        through: {
          from: 'user_roles.roleId',
          to: 'user_roles.userId',
        },
        to: 'users.id',
      },
    },
  };
}
