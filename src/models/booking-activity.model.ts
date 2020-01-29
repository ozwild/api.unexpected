import { Model, RelationMappings } from 'objection';

import { BookingStatus } from '../bookings/interfaces';

import BaseModel from './base-model';
import { BookingModel } from './booking.model';
import { AccountModel } from './account.model';
import { UserModel } from './user.model';

export class BookingActivity extends BaseModel {
  static tableName = 'booking_activities';

  id!: string;
  accountId!: string;
  reviewerId: string;
  bookingId: string;
  comments: string;
  status: BookingStatus;

  account?: Partial<AccountModel>;
  reviewer?: Partial<UserModel>;
  booking?: Partial<BookingModel>;

  static relationMappings: RelationMappings = {
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: `account.model`,
      join: {
        from: 'users.accountId',
        to: 'accounts.id',
      },
    },
    booking: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'booking.model',
      join: {
        from: 'booking_activities.bookingId',
        to: 'bookings.id',
      },
    },
    reviewer: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'user.model',
      join: {
        from: 'booking_activities.userId',
        to: 'users.id',
      },
    },
  };
}
