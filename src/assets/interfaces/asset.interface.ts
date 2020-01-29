import { IAccount } from '../../accounts/interfaces';

export enum AssetStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Maintenance = 'MAINTENANCE',
}

export interface IAsset {
  account: IAccount;
  name: string;
}
