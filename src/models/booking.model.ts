import { Model, RelationMappings } from 'objection';

import { BookingStatus } from '../bookings/interfaces';

import BaseModel from './base-model';
import { UserModel } from './user.model';
import { AssetModel } from './asset.model';
import { BookingActivity } from './booking-activity.model';
import { AccountModel } from './account.model';

export class BookingModel extends BaseModel {
  static tableName = 'bookings';

  id!: string;
  accountId!: string;
  bookerId: string;
  assetId: string;
  duration: string;
  from: Date;
  to: Date;
  status: BookingStatus;

  account?: Partial<AccountModel>;
  asset?: Partial<AssetModel>;
  booker?: Partial<UserModel>;
  activities?: Array<Partial<BookingActivity>>;

  static relationMappings: RelationMappings = {
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/account.model`,
      join: {
        from: 'users.accountId',
        to: 'accounts.id',
      },
    },
    activities: {
      relation: Model.HasManyRelation,
      modelClass: 'booking-activity.model',
      join: {
        from: 'bookings.id',
        to: 'booking_activities.bookingId',
      },
    },
    asset: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'asset.model',
      join: {
        from: 'bookings.assetId',
        to: 'assets.id',
      },
    },
    booker: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'user.model',
      join: {
        from: 'bookings.bookerId',
        to: 'users.id',
      },
    },
  };
}
