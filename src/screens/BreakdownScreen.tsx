import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SelectionHeader } from '@/components/SelectionHeader';
import { ThinBar } from '@/components/ThinBar';
import { buildBreakdownSteps } from '@/domain/scoreBreakdown';
import { dummyScores } from '@/dummy-data/scores';
import { useSelection } from '@/selection/SelectionContext';
import { colors, fontSizes, layout } from '@/theme';

export function BreakdownScreen() {
  const { selectedUserId } = useSelection();
  const score = dummyScores[selectedUserId];

  return (
    <ScreenContainer>
      <ScrollView>
        <SelectionHeader />

        <View style={styles.heading}>
          <AppText color={colors.secondaryText}>How the score was reached</AppText>
          <AppText size={fontSizes.mainNumber} style={styles.mainNumber}>
            {score.score}
          </AppText>
        </View>

        <View style={styles.steps}>
          {buildBreakdownSteps(score).map((step) => (
            <View key={step.name} style={styles.step}>
              <View style={styles.stepTitleRow}>
                <AppText>{step.name}</AppText>
                <AppText weight="medium">{step.points}</AppText>
              </View>
              <ThinBar
                widthPercent={step.barWidthPercent}
                color={step.kind === 'added' ? colors.pointsAdded : colors.pointsTakenAway}
              />
              <AppText size={fontSizes.secondary} color={colors.secondaryText} style={styles.note}>
                {step.note}
              </AppText>
            </View>
          ))}
          <View style={styles.total}>
            <AppText weight="medium">Score</AppText>
            <AppText weight="medium">{score.score}</AppText>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: 16, paddingHorizontal: layout.screenPadding },
  mainNumber: { marginTop: 2, lineHeight: 57.2, letterSpacing: -2 },
  steps: { marginTop: 12, marginHorizontal: layout.screenPadding },
  step: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.divider },
  stepTitleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  note: { marginTop: 6, lineHeight: 21 },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.text,
  },
});
