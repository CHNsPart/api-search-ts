import axios, { AxiosRequestConfig } from 'axios';
import { SearchConfig, SearchResult, SearchConnectOptions, SearchParams, PaginationOptions } from './types';
import { defaultTransformResponse, createSearchParams } from './utils';

export async function searchConnect<T = any>(
  params: SearchParams,
  config: SearchConfig,
  options?: SearchConnectOptions<T>
): Promise<SearchResult<T>> {
  try {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      url: config.endpoint,
    };

    if (config.method?.toUpperCase() === 'GET') {
      axiosConfig.params = createSearchParams(params);
    } else {
      axiosConfig.data = params;
    }

    const response = await axios(axiosConfig);
    const transformResponse = options?.transformResponse || defaultTransformResponse;
    const result = transformResponse(response.data) as SearchResult<T>;

    if (options?.onSuccess) {
      options.onSuccess(result);
    }

    return result;
  } catch (error) {
    if (options?.onError) {
      options.onError(error as Error);
    }
    throw error;
  }
}

export function createSearchConnector<T = any>(
  defaultConfig: SearchConfig,
  defaultOptions?: SearchConnectOptions<T>
) {
  return (params: SearchParams, configOverrides?: Partial<SearchConfig>, optionsOverrides?: Partial<SearchConnectOptions<T>>) => {
    const mergedConfig = { ...defaultConfig, ...configOverrides };
    const mergedOptions = { ...defaultOptions, ...optionsOverrides };
    return searchConnect<T>(params, mergedConfig, mergedOptions);
  };
}

export function withPagination<T = any>(
  searchFn: (params: SearchParams) => Promise<SearchResult<T>>
) {
  return async (params: SearchParams, paginationOptions: PaginationOptions = {}): Promise<SearchResult<T>> => {
    const { page = 1, pageSize = 10 } = paginationOptions;
    const paginatedParams = {
      ...params,
      page,
      pageSize,
    };
    return searchFn(paginatedParams);
  };
}