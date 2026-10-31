import { useState } from 'react';

export type DummyScoreStatus = 'ready' | 'loading' | 'error';

/*
 * Lets the loading and error designs be viewed before live data exists. Start
 * the app with EXPO_PUBLIC_DUMMY_SCORE_STATUS set to loading or error.
 */
export function useDummyScoreStatus() {
  const startingStatus = process.env.EXPO_PUBLIC_DUMMY_SCORE_STATUS as DummyScoreStatus | undefined;
  const [status, setStatus] = useState<DummyScoreStatus>(startingStatus ?? 'ready');
  return { status, retry: () => setStatus('ready') };
}
