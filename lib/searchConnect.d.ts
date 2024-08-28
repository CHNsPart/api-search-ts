import { SearchConfig, SearchResult, SearchConnectOptions, SearchParams, PaginationOptions } from './types';
export declare function searchConnect<T = any>(params: SearchParams, config: SearchConfig, options?: SearchConnectOptions<T>): Promise<SearchResult<T>>;
export declare function createSearchConnector<T = any>(defaultConfig: SearchConfig, defaultOptions?: SearchConnectOptions<T>): (params: SearchParams, configOverrides?: Partial<SearchConfig>, optionsOverrides?: Partial<SearchConnectOptions<T>>) => Promise<SearchResult<T>>;
export declare function withPagination<T = any>(searchFn: (params: SearchParams) => Promise<SearchResult<T>>): (params: SearchParams, paginationOptions?: PaginationOptions) => Promise<SearchResult<T>>;
