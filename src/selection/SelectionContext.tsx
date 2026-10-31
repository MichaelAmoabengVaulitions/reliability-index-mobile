import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface Selection {
  selectedUserId: string;
  scoringWindowEndDate: string;
  selectUser: (userId: string) => void;
  selectScoringWindowEndDate: (endDate: string) => void;
}

const defaultUserId = 'user_1009';
const defaultScoringWindowEndDate = '2026-10-31';

const SelectionContext = createContext<Selection | null>(null);

// Keeps the chosen user and scoring window the same on every tab.
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedUserId, selectUser] = useState(defaultUserId);
  const [scoringWindowEndDate, selectScoringWindowEndDate] = useState(defaultScoringWindowEndDate);

  const selection = useMemo(
    () => ({ selectedUserId, scoringWindowEndDate, selectUser, selectScoringWindowEndDate }),
    [selectedUserId, scoringWindowEndDate],
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
