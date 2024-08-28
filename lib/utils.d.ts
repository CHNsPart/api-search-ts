import { SearchResult } from './types';
export declare function defaultTransformResponse<T>(data: any): SearchResult<T>;
export declare function createSearchParams(params: Record<string, any>): URLSearchParams;
