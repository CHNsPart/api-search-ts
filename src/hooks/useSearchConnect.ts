import { useState, useCallback } from 'react';
import { searchConnect, SearchConfig, SearchParams, SearchResult } from '../utils/api';

export function useSearchConnect<T = any>(config: SearchConfig) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<SearchResult<T> | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchConnect<T>(params, config);
      setResults(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { search, loading, error, results };
}