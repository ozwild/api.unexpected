import { Model, RelationMappings } from 'objection';
import { UserStatus } from '../users/interfaces';

import BaseModel from './base-model';
import { RoleModel } from './role.model';
import { AccountModel } from './account.model';
import { HouseholdModel } from './household.model';
import { BookingModel } from './booking.model';

export class UserModel extends BaseModel {
  static tableName = 'users';
  static virtualAttributes = ['name'];

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  id!: string;
  accountId!: string;
  email!: string;
  firstName: string;
  lastName: string;

  status: UserStatus;

  account?: Partial<AccountModel>;
  roles?: Array<Partial<RoleModel>>;
  household?: Array<Partial<HouseholdModel>>;
  bookings?: Array<Partial<BookingModel>>;

  static relationMappings: RelationMappings = {
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/account.model`,
      join: {
        from: 'users.accountId',
        to: 'accounts.id',
      },
    },
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/role.model`,
      join: {
        from: 'users.id',
        through: {
          from: 'user_roles.userId',
          to: 'user_roles.roleId',
        },
        to: 'roles.id',
      },
    },
    bookings: {
      relation: Model.HasManyRelation,
      modelClass: 'booking.model',
      join: {
        from: 'users.id',
        to: 'bookings.userId',
      },
    },
    bookingActivities: {
      relation: Model.HasManyRelation,
      modelClass: 'booking-activity.model',
      join: {
        from: 'users.id',
        to: 'booking_activities.userId',
      },
    },
    household: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'household.model',
      join: {
        from: 'users.householdId',
        to: 'households.id',
      },
    },
  };
}
