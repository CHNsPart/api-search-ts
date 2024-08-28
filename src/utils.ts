import { SearchResult } from './types';

export function defaultTransformResponse<T>(data: any): SearchResult<T> {
  return {
    data: Array.isArray(data) ? data : data.data || [],
    totalCount: data.totalCount || data.total || (Array.isArray(data) ? data.length : 0),
    page: data.page,
    pageSize: data.pageSize,
  };
}

export function createSearchParams(params: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  return searchParams;
}