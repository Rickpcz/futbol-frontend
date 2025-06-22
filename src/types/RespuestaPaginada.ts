export type RespuestaPaginada<T> = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: T[];
};
