import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test-utils/renderWithProviders';

import { CashflowScreen } from './CashflowScreen';

describe('CashflowScreen', () => {
  it('shows the average left over and each month', async () => {
    await renderWithProviders(<CashflowScreen />);

    expect(screen.getByText('Left over on average each month')).toBeOnTheScreen();
    expect(screen.getByText('€4,483')).toBeOnTheScreen();
    expect(screen.getByText('May 2026')).toBeOnTheScreen();
    expect(screen.getByText('€4,428')).toBeOnTheScreen();
    expect(screen.getByText('In €6,424 · Out €1,996')).toBeOnTheScreen();
    expect(screen.getByText('Oct 2026')).toBeOnTheScreen();
  });

  it('shows a user who overspends', async () => {
    await renderWithProviders(<CashflowScreen />);
    await fireEvent.press(screen.getByLabelText(/Switch user/));
    await fireEvent.press(screen.getByText('user_1006'));

    expect(screen.getByText('Overspent on average each month')).toBeOnTheScreen();
    expect(screen.getByText('€1,537')).toBeOnTheScreen();
    expect(screen.getByText('−€1,585')).toBeOnTheScreen();
  });
});
