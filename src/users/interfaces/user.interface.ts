import { IAccount } from '../../accounts/interfaces';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Deleted = 'DELETED',
}

export interface IUser {
  email: string;
  roles: string[];
  account: IAccount;
}
