import { IAccount } from '../../accounts/interfaces';
import { IUser } from '../../users/interfaces';

export enum BookingStatus {
  Requested = 'REQUESTED',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Cancelled = 'CANCELLED',
}

export interface IBooking {
  account: IAccount;
  booker: IUser;
}
