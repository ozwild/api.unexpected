import { Model, RelationMappings } from 'objection';

import BaseModel from './base-model';
import { BookingModel } from './booking.model';
import { AccountModel } from './account.model';

export class AssetModel extends BaseModel {
  static tableName = 'assets';

  id: string;
  accountId: string;
  name: string;
  description: string;

  account?: Partial<AccountModel>;
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
    bookings: {
      relation: Model.HasManyRelation,
      modelClass: 'booking.model',
      join: {
        from: 'assets.id',
        to: 'bookings.assetId',
      },
    },
  };
}
