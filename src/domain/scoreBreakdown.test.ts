import { dummyScores } from '@/dummy-data/scores';

import { buildBreakdownSteps } from './scoreBreakdown';

describe('buildBreakdownSteps', () => {
  it('matches the design for a strong score', () => {
    expect(buildBreakdownSteps(dummyScores.user_1009)).toEqual([
      {
        name: 'Income and bills',
        points: '+75',
        barWidthPercent: 75,
        kind: 'added',
        note: 'Regular income, income compared with bills, and bills paid',
      },
      {
        name: 'Savings',
        points: '+25',
        barWidthPercent: 25,
        kind: 'added',
        note: 'Saves money regularly',
      },
      {
        name: 'Days below zero',
        points: '−10',
        barWidthPercent: 10,
        kind: 'takenAway',
        note: 'About 24 days',
      },
    ]);
  });

  it('shows a step for every penalty', () => {
    const stepNames = buildBreakdownSteps(dummyScores.user_1004).map((step) => step.name);
    expect(stepNames).toEqual([
      'Income and bills',
      'Days below zero',
      'Late fees',
      'High-risk spending',
    ]);
  });

  it.each(Object.values(dummyScores))('adds up to the score for $userId', (score) => {
    const total = buildBreakdownSteps(score).reduce((sum, step) => {
      const size = step.barWidthPercent;
      return step.kind === 'added' ? sum + size : sum - size;
    }, 0);
    expect(total).toBe(score.score);
  });
});
