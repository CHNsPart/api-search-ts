import { AxiosRequestConfig } from 'axios';

export interface SearchConfig extends AxiosRequestConfig {
  endpoint: string;
}

export interface SearchResult<T = any> {
  data: T[];
  totalCount: number;
  page?: number;
  pageSize?: number;
}

export interface SearchConnectOptions<T = any> {
  onSuccess?: (result: SearchResult<T>) => void;
  onError?: (error: Error) => void;
  transformResponse?: (data: any) => SearchResult<T>;
}

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export type SearchParams = Record<string, any>;