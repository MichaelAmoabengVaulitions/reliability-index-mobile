import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { describeScoringWindow } from '@/domain/scoringWindow';
import { useSelection } from '@/selection/SelectionContext';
import { colors, fontSizes, layout } from '@/theme';

import { AppText } from './AppText';
import { ChevronIcon } from './ChevronIcon';
import { ScoringWindowSheet } from './ScoringWindowSheet';
import { UserSheet } from './UserSheet';

// The user and scoring window buttons at the top of every tab.
export function SelectionHeader() {
  const { selectedUserId, scoringWindowEndDate } = useSelection();
  const [openSheet, setOpenSheet] = useState<'user' | 'scoringWindow' | null>(null);
  const scoringWindow = describeScoringWindow(scoringWindowEndDate);
  const closeSheet = () => setOpenSheet(null);

  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Switch user, current ${selectedUserId}`}
        onPress={() => setOpenSheet('user')}
        style={styles.button}
      >
        <AppText weight="medium">{selectedUserId}</AppText>
        <ChevronIcon direction="down" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Change scoring window, currently ${scoringWindow.longLabel}`}
        onPress={() => setOpenSheet('scoringWindow')}
        style={styles.button}
      >
        <AppText size={fontSizes.secondary}>{scoringWindow.shortLabel}</AppText>
        <ChevronIcon direction="down" />
      </Pressable>

      {openSheet === 'user' && <UserSheet onClose={closeSheet} />}
      {openSheet === 'scoringWindow' && <ScoringWindowSheet onClose={closeSheet} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: layout.screenPadding,
  },
  button: {
    height: layout.controlHeight,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: layout.controlRadius,
    backgroundColor: colors.controlBackground,
  },
});
