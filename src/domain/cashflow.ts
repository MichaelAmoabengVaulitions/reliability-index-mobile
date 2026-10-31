import { formatWholeAmount } from './money';

export interface MonthlyCashflow {
  label: string;
  moneyIn: number;
  moneyOut: number;
}

export function summarizeCashflow(months: MonthlyCashflow[]) {
  const results = months.map((month) => month.moneyIn - month.moneyOut);
  const largestResult = Math.max(...results.map(Math.abs));
  const total = results.reduce((sum, result) => sum + result, 0);
  const average = Math.round(total / months.length);

  return {
    heading: average < 0 ? 'Overspent on average each month' : 'Left over on average each month',
    averageText: formatWholeAmount(Math.abs(average)),
    months: months.map((month, position) => {
      const result = results[position];
      return {
        label: month.label,
        resultText: formatWholeAmount(result),
        detailText: `In ${formatWholeAmount(month.moneyIn)} · Out ${formatWholeAmount(month.moneyOut)}`,
        barWidthPercent: largestResult === 0 ? 0 : (Math.abs(result) / largestResult) * 100,
        isOverspent: result < 0,
      };
    }),
  };
}
