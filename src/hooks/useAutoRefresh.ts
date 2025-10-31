import { useEffect, useCallback } from 'react';

/**
 * Custom hook to automatically refresh data at a specified interval
 * Automatically pauses when the page is not visible to save resources
 *
 * @param fetchFunction - Function to call for refreshing data
 * @param interval - Refresh interval in milliseconds (default: 30000ms = 30s)
 */
export function useAutoRefresh(fetchFunction: () => void, interval: number = 30000) {
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      fetchFunction();
    }
  }, [fetchFunction]);

  useEffect(() => {
    // Set up the interval for auto-refresh
    const intervalId = setInterval(() => {
      // Only refresh if page is visible
      if (document.visibilityState === 'visible') {
        fetchFunction();
      }
    }, interval);

    // Listen for visibility changes to refresh when user returns to tab
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchFunction, interval, handleVisibilityChange]);
}
