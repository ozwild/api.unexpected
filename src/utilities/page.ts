export interface Page<T> {
  results: T[];
  total: number;
}

export interface PageFilter {
  page: number;
  size: number;
}
