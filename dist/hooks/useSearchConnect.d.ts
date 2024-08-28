import { SearchConfig, SearchParams, SearchResult } from '../utils/api';
export declare function useSearchConnect<T = any>(config: SearchConfig): {
    search: (params: SearchParams) => Promise<void>;
    loading: boolean;
    error: Error | null;
    results: SearchResult<T> | null;
};
