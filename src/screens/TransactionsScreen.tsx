import { FlashList } from '@shopify/flash-list';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SelectField } from '@/components/SelectField';
import { SelectionHeader } from '@/components/SelectionHeader';
import { formatTransactionAmount } from '@/domain/money';
import { formatDateForRow } from '@/domain/scoringWindow';
import {
  defaultTransactionFilters,
  filterAndSortTransactions,
  listCategories,
  sortOptions,
  type Transaction,
  type TransactionDirection,
  type TransactionFilters,
} from '@/domain/transactionList';
import { dummyTransactions } from '@/dummy-data/transactions';
import { useSelection } from '@/selection/SelectionContext';
import { colors, fontFamilies, fontSizes, layout } from '@/theme';

const directionTabs: { direction: TransactionDirection; label: string }[] = [
  { direction: 'all', label: 'All' },
  { direction: 'moneyIn', label: 'Money in' },
  { direction: 'moneyOut', label: 'Money out' },
];

const categories = listCategories(dummyTransactions);

export function TransactionsScreen() {
  const { selectedUserId } = useSelection();

  return (
    <ScreenContainer>
      <SelectionHeader />
      {/* The key gives each user a fresh list with clear filters. */}
      <TransactionList key={selectedUserId} />
    </ScreenContainer>
  );
}

function TransactionList() {
  const [filters, setFilters] = useState(defaultTransactionFilters);
  const updateFilters = (changes: Partial<TransactionFilters>) =>
    setFilters((current) => ({ ...current, ...changes }));

  const visibleTransactions = useMemo(
    () => filterAndSortTransactions(dummyTransactions, filters),
    [filters],
  );

  return (
    <>
      <View style={styles.controls}>
        <TextInput
          accessibilityLabel="Search by merchant"
          placeholder="Search by merchant"
          placeholderTextColor={colors.secondaryText}
          value={filters.search}
          onChangeText={(search) => updateFilters({ search })}
          style={styles.search}
        />
        <View style={styles.selectRow}>
          <SelectField
            label="Category"
            value={filters.category}
            options={categories}
            onSelect={(category) => updateFilters({ category })}
          />
          <SelectField
            label="Sort"
            value={filters.sort}
            options={sortOptions}
            onSelect={(sort) => updateFilters({ sort })}
          />
        </View>
      </View>

      <View style={styles.directionTabs}>
        {directionTabs.map(({ direction, label }) => {
          const isActive = filters.direction === direction;
          return (
            <Pressable
              key={direction}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => updateFilters({ direction })}
              style={[styles.directionTab, isActive && styles.activeDirectionTab]}
            >
              <AppText
                weight={isActive ? 'medium' : 'regular'}
                color={isActive ? colors.text : colors.secondaryText}
              >
                {label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.statusRow}>
        <AppText size={fontSizes.secondary} color={colors.secondaryText}>
          {visibleTransactions.length} of {dummyTransactions.length} transactions
        </AppText>
        <AppText size={fontSizes.secondary} color={colors.secondaryText}>
          Live
        </AppText>
      </View>

      <View style={styles.list}>
        <FlashList
          data={visibleTransactions}
          keyExtractor={(transaction) => transaction.id}
          renderItem={({ item }) => <TransactionRow transaction={item} />}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <NoMatchingTransactions onClear={() => setFilters(defaultTransactionFilters)} />
          }
        />
      </View>
    </>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowDetails}>
        <AppText numberOfLines={1}>{transaction.merchantName}</AppText>
        <AppText size={fontSizes.secondary} color={colors.secondaryText}>
          {formatDateForRow(transaction.date)} · {transaction.category}
        </AppText>
      </View>
      <AppText weight="medium">{formatTransactionAmount(transaction.amount)}</AppText>
    </View>
  );
}

function NoMatchingTransactions({ onClear }: { onClear: () => void }) {
  return (
    <View style={styles.emptyState}>
      <AppText size={fontSizes.emphasis}>No matching transactions</AppText>
      <AppText size={fontSizes.secondary} color={colors.secondaryText} style={styles.emptyHint}>
        Try another search or filter.
      </AppText>
      <Pressable accessibilityRole="button" onPress={onClear} style={styles.clearButton}>
        <AppText>Clear filters</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { paddingHorizontal: layout.screenPadding },
  search: {
    height: layout.controlHeight,
    marginTop: 12,
    paddingHorizontal: 14,
    borderRadius: layout.controlRadius,
    backgroundColor: colors.controlBackground,
    color: colors.text,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.body,
  },
  selectRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  directionTabs: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
    marginHorizontal: layout.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  directionTab: {
    height: layout.controlHeight,
    marginBottom: -1,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeDirectionTab: { borderBottomColor: colors.text },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: layout.screenPadding,
  },
  list: { flex: 1, marginTop: 16, marginHorizontal: layout.screenPadding },
  row: {
    height: layout.transactionRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowDetails: { flex: 1, minWidth: 0 },
  emptyState: { paddingVertical: 40, alignItems: 'center' },
  emptyHint: { marginTop: 4 },
  clearButton: {
    height: layout.controlHeight,
    marginTop: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: layout.controlRadius,
    backgroundColor: colors.controlBackground,
  },
});
