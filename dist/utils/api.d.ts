import { AxiosRequestConfig } from 'axios';
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
export declare function searchConnect<T = any>(params: SearchParams, config: SearchConfig): Promise<SearchResult<T>>;
