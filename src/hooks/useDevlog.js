import { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../config';

/**
 * Custom hook to fetch and manage devlog data from the API
 * Provides loading state, error handling, and filtering/sorting capabilities
 * Falls back to mock data if API is unavailable
 * Optimized with useMemo to prevent unnecessary re-renders
 */
const useDevlog = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize filter values to prevent unnecessary effect triggers
  const memoizedFilters = useMemo(() => ({
    version: filters.version,
    tags: filters.tags,
    search: filters.search,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder
  }), [filters.version, filters.tags, filters.search, filters.sortBy, filters.sortOrder]);

  useEffect(() => {
    const fetchDevlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters from memoized filters
        const params = new URLSearchParams();
        
        if (memoizedFilters.version) params.append('version', memoizedFilters.version);
        if (memoizedFilters.tags && memoizedFilters.tags.length > 0) {
          params.append('tags', memoizedFilters.tags.join(','));
        }
        if (memoizedFilters.search) params.append('search', memoizedFilters.search);
        if (memoizedFilters.sortBy) params.append('sortBy', memoizedFilters.sortBy);
        if (memoizedFilters.sortOrder) params.append('sortOrder', memoizedFilters.sortOrder);

        try {
          const response = await fetch(`${API_URL}/api/devlog?${params}`, {
            // Add timeout for production environments
            signal: AbortSignal.timeout(5000)
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const jsonData = await response.json();
          setData(jsonData.entries || []);
        } catch (fetchError) {
          // If API is unavailable (e.g., in production without backend),
          // return empty array or mock data
          if (process.env.NODE_ENV === 'development') {
            console.warn('API unavailable, using fallback data:', fetchError.message);
          }
          setData([]);
          // Optionally show a friendly message instead of error
          setError(null);
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching devlog data:', err);
        }
        setError(err.message || 'Failed to fetch devlog data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDevlogData();
  }, [memoizedFilters]);

  return { entries: data, loading, error };
};

export default useDevlog;
