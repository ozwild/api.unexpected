export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Sort<T> {
  orderBy?: T;
  order?: SortDirection;
}
