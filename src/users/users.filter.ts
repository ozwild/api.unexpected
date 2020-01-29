import { UserStatus } from './interfaces';

export enum UsersOrder {
  Name = 'name',
  Email = 'email',
  Status = 'status',
}

export class UsersFilter {
  search?: string;
  roles?: string[];
  status?: UserStatus[];
}
