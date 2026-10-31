import type { BillPayment, ReliabilityScore, ScoreBand } from '@/domain/score';

interface DummyScoreDetails {
  score: number;
  band: ScoreBand;
  monthsWithIncome: number;
  incomeComparedWithBills: number | null;
  essentialBillsPaidPercent: number;
  billPayment: BillPayment;
  goodMonths: number;
  lateFees: number;
  daysBelowZero: number;
  savingsPoints: number;
  highRiskPenaltyPoints?: number;
}

const penaltyForAnyDaysBelowZero = 10;

function dummyScore(userId: string, details: DummyScoreDetails): ReliabilityScore {
  return {
    ...details,
    userId,
    daysBelowZeroPenaltyPoints: details.daysBelowZero > 0 ? penaltyForAnyDaysBelowZero : 0,
    highRiskPenaltyPoints: details.highRiskPenaltyPoints ?? 0,
  };
}

// The sample users from the design, used until the app reads live data.
export const dummyScores: Record<string, ReliabilityScore> = {
  user_1001: dummyScore('user_1001', { score: 80, band: 'High', monthsWithIncome: 6, incomeComparedWithBills: 1.8, essentialBillsPaidPercent: 89, billPayment: 'regular', goodMonths: 5, lateFees: 1, daysBelowZero: 40, savingsPoints: 21 }),
  user_1002: dummyScore('user_1002', { score: 87, band: 'High', monthsWithIncome: 6, incomeComparedWithBills: 2.42, essentialBillsPaidPercent: 86, billPayment: 'regular', goodMonths: 6, lateFees: 0, daysBelowZero: 24, savingsPoints: 25 }),
  user_1003: dummyScore('user_1003', { score: 74, band: 'Medium', monthsWithIncome: 6, incomeComparedWithBills: 3.75, essentialBillsPaidPercent: 67, billPayment: 'gaps', goodMonths: 6, lateFees: 0, daysBelowZero: 18, savingsPoints: 17 }),
  user_1004: dummyScore('user_1004', { score: 47, band: 'Low', monthsWithIncome: 6, incomeComparedWithBills: 2.46, essentialBillsPaidPercent: 50, billPayment: 'gaps', goodMonths: 6, lateFees: 3, daysBelowZero: 35, savingsPoints: 0, highRiskPenaltyPoints: 3 }),
  user_1005: dummyScore('user_1005', { score: 15, band: 'Low', monthsWithIncome: 0, incomeComparedWithBills: 0, essentialBillsPaidPercent: 0, billPayment: 'missed', goodMonths: 6, lateFees: 0, daysBelowZero: 0, savingsPoints: 0 }),
  user_1006: dummyScore('user_1006', { score: 14, band: 'Low', monthsWithIncome: 0, incomeComparedWithBills: 0, essentialBillsPaidPercent: 42, billPayment: 'missed', goodMonths: 0, lateFees: 0, daysBelowZero: 184, savingsPoints: 13 }),
  user_1007: dummyScore('user_1007', { score: 72, band: 'Medium', monthsWithIncome: 5, incomeComparedWithBills: 2.06, essentialBillsPaidPercent: 64, billPayment: 'gaps', goodMonths: 5, lateFees: 1, daysBelowZero: 79, savingsPoints: 21 }),
  user_1008: dummyScore('user_1008', { score: 56, band: 'Medium', monthsWithIncome: 6, incomeComparedWithBills: 1.42, essentialBillsPaidPercent: 83, billPayment: 'regular', goodMonths: 6, lateFees: 3, daysBelowZero: 24, savingsPoints: 4 }),
  user_1009: dummyScore('user_1009', { score: 90, band: 'High', monthsWithIncome: 6, incomeComparedWithBills: 3.29, essentialBillsPaidPercent: 100, billPayment: 'regular', goodMonths: 6, lateFees: 0, daysBelowZero: 24, savingsPoints: 25 }),
  user_1010: dummyScore('user_1010', { score: 41, band: 'Low', monthsWithIncome: 3, incomeComparedWithBills: null, essentialBillsPaidPercent: 0, billPayment: 'missed', goodMonths: 6, lateFees: 0, daysBelowZero: 0, savingsPoints: 13 }),
};

export const dummyUserIds = Object.keys(dummyScores);
