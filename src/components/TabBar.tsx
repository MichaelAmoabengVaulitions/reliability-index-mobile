import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, fontSizes, layout } from '@/theme';

import { AppText } from './AppText';

interface TabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  navigateToTab: (routeKey: string) => void;
}

// The four custom icons from the design, listed by route name.
const tabs: Record<string, { label: string; iconPath: string }> = {
  index: {
    label: 'Score',
    iconPath:
      'M5.5 3h3A2.5 2.5 0 0 1 11 5.5v3A2.5 2.5 0 0 1 8.5 11h-3A2.5 2.5 0 0 1 3 8.5v-3A2.5 2.5 0 0 1 5.5 3zm10 0h3A2.5 2.5 0 0 1 21 5.5v3a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 13 8.5v-3A2.5 2.5 0 0 1 15.5 3zm-10 10h3a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 8.5 21h-3A2.5 2.5 0 0 1 3 18.5v-3A2.5 2.5 0 0 1 5.5 13zM17 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  },
  breakdown: {
    label: 'Breakdown',
    iconPath:
      'M5 14h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm6.500-5h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM18 3h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  },
  cashflow: {
    label: 'Cashflow',
    iconPath: 'M2 11A9 9 0 0 1 11 2v9zm20 2a9 9 0 0 1-9 9v-9z',
  },
  transactions: {
    label: 'Transactions',
    iconPath:
      'M4.250 4h9.500a2.250 2.250 0 0 1 0 4.500h-9.500a2.250 2.250 0 0 1 0-4.500zm6 6h9.500a2.250 2.250 0 0 1 0 4.500h-9.500a2.250 2.250 0 0 1 0-4.500zm-6 6h5.500a2.250 2.250 0 0 1 0 4.500h-5.500a2.250 2.250 0 0 1 0-4.500z',
  },
};

export function TabBar({ state, navigateToTab }: TabBarProps) {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const bottomSpace = Math.max(bottomInset, layout.tabBarMinimumBottomSpace);

  return (
    <View style={[styles.bar, { height: layout.tabBarContentHeight + bottomSpace }]}>
      {state.routes.map((route, position) => {
        const isActive = position === state.index;
        const inkColor = isActive ? colors.text : colors.secondaryText;
        const { label, iconPath } = tabs[route.name];

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
            onPress={() => navigateToTab(route.key)}
            style={styles.tab}
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill={inkColor}>
              <Path d={iconPath} />
            </Svg>
            <AppText
              size={fontSizes.tabLabel}
              weight={isActive ? 'medium' : 'regular'}
              color={inkColor}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.background,
  },
  tab: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', gap: 4 },
});
