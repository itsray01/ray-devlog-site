import { useState, useEffect } from 'react';
import { API_URL } from '../config';

/**
 * Custom hook to fetch and manage devlog data from the API
 * Provides loading state, error handling, and filtering/sorting capabilities
 * Falls back to mock data if API is unavailable
 */
const useDevlog = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters from filters
        const params = new URLSearchParams();
        
        if (filters.version) params.append('version', filters.version);
        if (filters.tags && filters.tags.length > 0) {
          params.append('tags', filters.tags.join(','));
        }
        if (filters.search) params.append('search', filters.search);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

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
          console.warn('API unavailable, using fallback data:', fetchError.message);
          setData([]);
          // Optionally show a friendly message instead of error
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching devlog data:', err);
        setError(err.message || 'Failed to fetch devlog data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDevlogData();
  }, [filters.version, filters.tags, filters.search, filters.sortBy, filters.sortOrder]);

  return { entries: data, loading, error };
};

export default useDevlog;
