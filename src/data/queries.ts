import { queryOptions } from '@tanstack/react-query';

import { fetchDiscovery, fetchReliability } from '@/api/client';
import { toReliabilityScore } from '@/domain/reliabilityScoreMapping';

export const discoveryQuery = queryOptions({
  queryKey: ['reliability', 'discovery'],
  queryFn: fetchDiscovery,
  staleTime: Infinity,
});

export function reliabilityQuery(userId: string, endDate: string) {
  return queryOptions({
    queryKey: ['reliability', 'score', userId, endDate],
    queryFn: async ({ signal }) =>
      toReliabilityScore(await fetchReliability(userId, endDate, signal)),
  });
}
