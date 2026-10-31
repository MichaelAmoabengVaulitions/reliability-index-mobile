import { summarizeCashflow, type MonthlyCashflow } from './cashflow';

const monthsWithMoneyLeftOver: MonthlyCashflow[] = [
  { label: 'May 2026', moneyIn: 6424, moneyOut: 1996 },
  { label: 'Jun 2026', moneyIn: 6289, moneyOut: 2019 },
];

const overspentMonths: MonthlyCashflow[] = [
  { label: 'May 2026', moneyIn: 0, moneyOut: 1585 },
  { label: 'Jun 2026', moneyIn: 0, moneyOut: 1502 },
];

describe('summarizeCashflow', () => {
  it('shows the average left over each month', () => {
    const summary = summarizeCashflow(monthsWithMoneyLeftOver);
    expect(summary.heading).toBe('Left over on average each month');
    expect(summary.averageText).toBe('€4,349');
  });

  it('shows the average overspent each month, without a minus sign', () => {
    const summary = summarizeCashflow(overspentMonths);
    expect(summary.heading).toBe('Overspent on average each month');
    expect(summary.averageText).toBe('€1,543');
  });

  it('describes each month', () => {
    expect(summarizeCashflow(overspentMonths).months[0]).toEqual({
      label: 'May 2026',
      resultText: '−€1,585',
      detailText: 'In €0 · Out €1,585',
      barWidthPercent: 100,
      isOverspent: true,
    });
  });

  it('sizes each bar against the largest month', () => {
    const [largest, smaller] = summarizeCashflow(monthsWithMoneyLeftOver).months;
    expect(largest.barWidthPercent).toBe(100);
    expect(smaller.barWidthPercent).toBeCloseTo((4270 / 4428) * 100);
  });

  it('draws empty bars when every month nets to zero', () => {
    const months = [{ label: 'May 2026', moneyIn: 0, moneyOut: 0 }];
    expect(summarizeCashflow(months).months[0].barWidthPercent).toBe(0);
  });
});
