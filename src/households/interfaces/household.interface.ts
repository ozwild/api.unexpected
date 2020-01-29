import { IAccount } from '../../accounts/interfaces';
import { IUser } from '../../users/interfaces';

export enum HouseholdStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export interface IHousehold {
  account: IAccount;
  name: string;
  address: string;
  phone: string;
  members: IUser[];
}
