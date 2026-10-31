import { screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test-utils/renderWithProviders';

import { BreakdownScreen } from './BreakdownScreen';

describe('BreakdownScreen', () => {
  it('shows each step and the score at the end', async () => {
    await renderWithProviders(<BreakdownScreen />);

    expect(screen.getByText('How the score was reached')).toBeOnTheScreen();
    expect(screen.getByText('Income and bills')).toBeOnTheScreen();
    expect(screen.getByText('+75')).toBeOnTheScreen();
    expect(screen.getByText('Savings')).toBeOnTheScreen();
    expect(screen.getByText('+25')).toBeOnTheScreen();
    expect(screen.getByText('Days below zero')).toBeOnTheScreen();
    expect(screen.getByText('−10')).toBeOnTheScreen();
    expect(screen.getByText('About 24 days')).toBeOnTheScreen();
    expect(screen.getByText('Score')).toBeOnTheScreen();
    expect(screen.getAllByText('90')).toHaveLength(2);
  });

  it('has the same user and window buttons as every tab', async () => {
    await renderWithProviders(<BreakdownScreen />);
    expect(screen.getByLabelText(/Switch user/)).toBeOnTheScreen();
    expect(screen.getByLabelText(/Change scoring window/)).toBeOnTheScreen();
  });
});
