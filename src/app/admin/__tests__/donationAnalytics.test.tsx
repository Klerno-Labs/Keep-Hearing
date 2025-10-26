import { render, screen, waitFor } from '@testing-library/react';
import DonationAnalytics from '../page';

describe('DonationAnalytics', () => {
  it('renders total donations from API', async () => {
    // Mock fetch
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ total: 12345 })
    })) as any;

    render(<DonationAnalytics />);
    await waitFor(() => {
      expect(screen.getByText(/12,345/)).toBeInTheDocument();
    });
  });
});
