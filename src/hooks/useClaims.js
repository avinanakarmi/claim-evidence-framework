import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { claimsApi } from '../services/claimsApi';

// Query keys for React Query
export const claimsKeys = {
  all: ['claims'],
  search: (query) => ['claims', 'search', query],
  searchInfinite: (query) => ['claims', 'search', 'infinite', query],
  detail: (id) => ['claims', 'detail', id],
  list: (filters) => ['claims', 'list', filters],
  byImageId: (imageId) => ['claims', 'byImageId', imageId],
};

// Hook to search claims with infinite loading
export const useInfiniteSearchClaims = (query, options = {}) => {
  return useInfiniteQuery({
    queryKey: claimsKeys.searchInfinite(query),
    queryFn: ({ pageParam = 0 }) => claimsApi.searchClaims(query, pageParam, 10),
    enabled: !!query && query.length > 0, // Only run if query exists
    getNextPageParam: (lastPage) => {
      // If there are more results, return the next skip value
      if (lastPage.hasMore) {
        return lastPage.skip + lastPage.limit;
      }
      return undefined; // No more pages
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options
  });
};

// Hook to search claims (legacy version for compatibility)
export const useSearchClaims = (query, options = {}) => {
  return useQuery({
    queryKey: claimsKeys.search(query),
    queryFn: () => claimsApi.searchClaims(query),
    enabled: !!query && query.length > 0, // Only run if query exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options
  });
};

// Hook to get claims by image ID (no caching)
export const useClaimsByImageId = (imageId, options = {}) => {
  return useQuery({
    queryKey: claimsKeys.byImageId(imageId),
    queryFn: () => claimsApi.getClaimsByImageId(imageId),
    enabled: !!imageId, // Only run if imageId exists
    staleTime: 0, // Never consider data stale
    cacheTime: 0, // Don't cache the result
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false,
    ...options
  });
};