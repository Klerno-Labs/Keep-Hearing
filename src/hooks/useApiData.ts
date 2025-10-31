import { useState, useEffect, useCallback } from 'react';

interface UseApiDataOptions<T> {
  initialData?: T;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for fetching data from an API endpoint with loading state
 *
 * @param url - API endpoint URL
 * @param options - Configuration options
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useApiData<T>(
  url: string,
  options: UseApiDataOptions<T> = {}
) {
  const { initialData, onError } = options;
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [url, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
