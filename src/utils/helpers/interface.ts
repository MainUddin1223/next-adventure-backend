export interface IPaginationPayload {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IPaginationValue {
  skip: number;
  take: number;
  orderBy: unknown;
  page: number;
}
export interface IMeta {
  page?: number;
  size?: number;
  total?: number;
  totalPage?: number;
}
export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta;
  data?: T | null;
}
