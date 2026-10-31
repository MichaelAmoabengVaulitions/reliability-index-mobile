import { useQuery } from '@tanstack/react-query';

import type { ReliabilityScore } from '@/domain/score';

import { reliabilityQuery } from './queries';

export interface ReliabilityScoreResult {
  status: 'loading' | 'error' | 'ready';
  score: ReliabilityScore | undefined;
  retry: () => void;
}

export function useReliabilityScore(userId: string, endDate: string): ReliabilityScoreResult {
  const { data, isPending, isError, refetch } = useQuery(reliabilityQuery(userId, endDate));
  const retry = () => void refetch();

  if (isError) return { status: 'error', score: undefined, retry };
  if (isPending) return { status: 'loading', score: undefined, retry };
  return { status: 'ready', score: data, retry };
}
