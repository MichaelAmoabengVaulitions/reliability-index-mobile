import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { dummyUserIds } from '@/dummy-data/scores';
import { useSelection } from '@/selection/SelectionContext';
import { colors, layout } from '@/theme';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';

export function UserSheet({ onClose }: { onClose: () => void }) {
  const { selectUser } = useSelection();

  function pickUser(userId: string) {
    selectUser(userId);
    onClose();
  }

  return (
    <BottomSheet title="Choose a user" onClose={onClose} style={styles.sheet}>
      <ScrollView style={styles.list}>
        {dummyUserIds.map((userId) => (
          <Pressable
            key={userId}
            accessibilityRole="button"
            onPress={() => pickUser(userId)}
            style={styles.row}
          >
            <AppText>{userId}</AppText>
          </Pressable>
        ))}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: { height: layout.userSheetHeight },
  list: { flex: 1, marginTop: 8 },
  row: {
    height: 56,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
