import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { discoveryQuery } from '@/data/queries';
import { todayAsDate } from '@/domain/scoringWindow';

interface Selection {
  userIds: readonly string[];
  // Empty until the list of users has loaded.
  selectedUserId: string;
  scoringWindowEndDate: string;
  selectUser: (userId: string) => void;
  selectScoringWindowEndDate: (endDate: string) => void;
}

const noUsers: readonly string[] = [];

const SelectionContext = createContext<Selection | null>(null);

interface SelectionProviderProps {
  children: ReactNode;
  initialEndDate?: string;
}

// Keeps the chosen user and scoring window the same on every tab.
export function SelectionProvider({ children, initialEndDate }: SelectionProviderProps) {
  const { data: discovery } = useQuery(discoveryQuery);
  const userIds = discovery?.userIds ?? noUsers;
  const [pickedUserId, selectUser] = useState<string | null>(null);
  const [scoringWindowEndDate, selectScoringWindowEndDate] = useState(
    initialEndDate ?? todayAsDate(),
  );
  const selectedUserId = pickedUserId ?? userIds[0] ?? '';

  const selection = useMemo(
    () => ({
      userIds,
      selectedUserId,
      scoringWindowEndDate,
      selectUser,
      selectScoringWindowEndDate,
    }),
    [userIds, selectedUserId, scoringWindowEndDate],
  );

  return <SelectionContext.Provider value={selection}>{children}</SelectionContext.Provider>;
}

export function useSelection(): Selection {
  const selection = useContext(SelectionContext);
  if (selection === null) {
    throw new Error('useSelection must be used inside SelectionProvider.');
  }
  return selection;
}
