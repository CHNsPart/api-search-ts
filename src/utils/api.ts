import axios, { AxiosRequestConfig } from 'axios';

export interface SearchConfig extends AxiosRequestConfig {
  endpoint: string;
}

export interface SearchResult<T = any> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export type SearchParams = Record<string, any>;

export async function searchConnect<T = any>(
  params: SearchParams,
  config: SearchConfig
): Promise<SearchResult<T>> {
  const { endpoint, ...axiosConfig } = config;
  const response = await axios.request({
    ...axiosConfig,
    url: endpoint,
    params,
  });

  return {
    data: response.data.data || response.data,
    totalCount: response.data.totalCount || response.data.length,
    page: response.data.page || 1,
    pageSize: response.data.pageSize || response.data.length,
  };
}