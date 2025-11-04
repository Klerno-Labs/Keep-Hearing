import { render, screen, waitFor } from '@testing-library/react';
import AdminDashboard from '../page';

describe('AdminDashboard', () => {
  it('renders admin dashboard', async () => {
    // Mock fetch
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ users: [], donations: [], logs: [] })
    })) as any;

    render(<AdminDashboard />);
    await waitFor(() => {
      expect(screen.getByText(/Users/)).toBeInTheDocument();
    });
  });
});
