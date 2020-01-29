import { Injectable, Optional } from '@nestjs/common';
import { Transaction, Page, QueryBuilder } from 'objection';

import { Logger, ApiLogger } from '../logger';
import { UserModel, RoleModel } from '../models';

import { PageFilter, Sort } from '../utilities';
import { UserStatus } from './interfaces';
import { UsersFilter, UsersOrder } from './users.filter';

const defaultEagerExpr = '[roles, teams, skillAssignments.[skill]]';

@Injectable()
export class UsersService {
  constructor(@Logger('UsersService') private readonly logger: ApiLogger) {}

  private applyOrder(query: QueryBuilder<UserModel>, { orderBy, order }: Sort<UsersOrder>): void {
    switch (orderBy) {
      case UsersOrder.Name:
        query.orderBy('firstName', order).orderBy('lastName', order);
      case UsersOrder.Email:
        query.orderBy('email', order);
      case UsersOrder.Status:
        query.orderBy('status', order);
    }
  }

  private applyFilter(query: QueryBuilder<UserModel>, filter: UsersFilter): void {
    const { search, roles, status } = filter;
    if (search) {
      query.where(builder => {
        builder
          .where('firstName', '~*', search)
          .orWhere('lastName', '~*', search)
          .orWhere('email', '~*', search);
      });
    }

    if (roles && roles.length) {
      query.whereExists(UserModel.relatedQuery<RoleModel>('roles').whereIn('uniqueName', roles));
    }

    if (status && status.length) {
      query.whereIn('status', status);
    }
  }

  findUsers(
    accountId: string,
    filter?: UsersFilter,
    sort?: Sort<UsersOrder>,
    eager = defaultEagerExpr,
    db?: Transaction,
  ): QueryBuilder<UserModel> {
    const query = UserModel.query(db).where('accountId', accountId);

    if (filter) {
      this.applyFilter(query, filter);
    }

    if (sort) {
      this.applyOrder(query, sort);
    }

    return query.withGraphFetched(eager);
  }

  findPage(
    accountId: string,
    filter: UsersFilter,
    { page, size }: PageFilter,
    sort: Sort<UsersOrder>,
    eager = defaultEagerExpr,
    db?: Transaction,
  ): Promise<Page<UserModel>> {
    return this.findUsers(accountId, filter, sort, eager, db).page(page, size);
  }

  findById(
    accountId: string,
    id: string,
    eager = defaultEagerExpr,
    db?: Transaction,
  ): Promise<UserModel> {
    return UserModel.query(db)
      .findById(id)
      .where('accountId', accountId)
      .where('status', '!=', UserStatus.Deleted)
      .withGraphFetched(eager);
  }

  findByEmail(
    accountId: string,
    email: string,
    eager = defaultEagerExpr,
    db?: Transaction,
  ): Promise<UserModel> {
    return UserModel.query(db)
      .findOne({
        email,
        accountId,
        status: UserStatus.Active,
      })
      .withGraphFetched(eager);
  }

  async updateUserAndWorker(
    id: string,
    data: Partial<UserModel>,
    db?: Transaction,
  ): Promise<UserModel> {
    const result = await this.updateUser(id, data, db);

    return result;
  }

  async delete(accountId: string, id: string, db?: Transaction): Promise<UserModel> {
    const result = await UserModel.query(db)
      .updateAndFetchById(id, {
        status: UserStatus.Deleted,
      })
      .where('accountId', accountId);
    return result;
  }

  async filterEmailsThatExist(
    accountId: string,
    emails: string[],
    db?: Transaction,
  ): Promise<string[]> {
    const results = await UserModel.query(db)
      .select('email')
      .where('accountId', accountId)
      .whereIn('email', emails);

    return results.map(result => result.email);
  }

  async findRoles(db?: Transaction): Promise<RoleModel[]> {
    return RoleModel.query(db).orderBy('uniqueName');
  }

  async upsertUser(user: Partial<UserModel>, db?: Transaction): Promise<UserModel> {
    this.logger.debug(`Upserting user with data ${JSON.stringify(user)}`);

    const { accountId, email } = user;
    const existing = await this.findByEmail(accountId, email, null, db);

    let result: UserModel;
    if (existing) {
      const { id } = existing;
      this.logger.debug(`Updating user ${id} with data ${JSON.stringify(user)}`);
      result = await this.updateUser(id, user, db);
    } else {
      this.logger.debug(`Inserting user with data ${JSON.stringify(user)}`);
      result = await this.insertUser(user, db);
    }

    return result;
  }

  async insertUser(user: Partial<UserModel>, db?: Transaction): Promise<UserModel> {
    return UserModel.query(db).insertGraphAndFetch(user, { relate: true });
  }

  async updateUser(id: string, user: Partial<UserModel>, db?: Transaction): Promise<UserModel> {
    return UserModel.query(db).upsertGraphAndFetch(
      {
        id,
        ...user,
      },
      { relate: true, unrelate: true },
    );
  }
}
