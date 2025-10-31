/**
 * Admin Panel Integration Tests
 * Tests all CRUD operations and functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../page';

// Mock fetch globally
global.fetch = jest.fn();

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'admin-123',
        email: 'admin@test.com',
        name: 'Test Admin',
        role: 'ADMIN'
      }
    },
    status: 'authenticated'
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('Admin Panel Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('User Management Tab', () => {
    it('should load and display users', async () => {
      const mockUsers = [
        {
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'STAFF',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: 'user2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'ADMIN',
          createdAt: '2024-01-02T00:00:00.000Z'
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: mockUsers })
      });

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      });
    });

    it('should search/filter users', async () => {
      const mockUsers = [
        {
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'STAFF',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: 'user2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'ADMIN',
          createdAt: '2024-01-02T00:00:00.000Z'
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: mockUsers })
      });

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });

      // Search for John
      const searchInput = screen.getByPlaceholderText(/Search users/i);
      fireEvent.change(searchInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      });
    });
  });

  describe('Donations Tab', () => {
    it('should load and display donations', async () => {
      const mockTotal = { total: 12345 };
      const mockDonations = {
        donations: [
          { id: 1, name: 'John Doe', amount: 100, date: '2024-01-01' },
          { id: 2, name: 'Jane Smith', amount: 250, date: '2024-01-02' }
        ]
      };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ users: [] })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTotal
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockDonations
        });

      render(<AdminDashboard />);

      // Switch to donations tab
      const donationsButton = screen.getByText('Donations');
      fireEvent.click(donationsButton);

      await waitFor(() => {
        expect(screen.getByText(/12,345/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should handle empty donations list', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ users: [] })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ total: 0 })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ donations: [] })
        });

      render(<AdminDashboard />);

      const donationsButton = screen.getByText('Donations');
      fireEvent.click(donationsButton);

      await waitFor(() => {
        expect(screen.getByText(/No donations found/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Tab Navigation', () => {
    it('should switch between tabs correctly', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ users: [], donations: [], logs: [], total: 0 })
      });

      render(<AdminDashboard />);

      // Start on Users tab
      expect(screen.getByText('User Management')).toBeInTheDocument();

      // Switch to Donations
      fireEvent.click(screen.getByText('Donations'));
      await waitFor(() => {
        expect(screen.getByText('Total Donations')).toBeInTheDocument();
      });

      // Switch to Analytics
      fireEvent.click(screen.getByText('Analytics'));
      await waitFor(() => {
        expect(screen.getByText('Site Analytics')).toBeInTheDocument();
      });

      // Switch to Audit
      fireEvent.click(screen.getByText('Audit'));
      await waitFor(() => {
        expect(screen.getByText('Audit Log')).toBeInTheDocument();
      });

      // Switch back to Users
      fireEvent.click(screen.getByText('Users'));
      await waitFor(() => {
        expect(screen.getByText('User Management')).toBeInTheDocument();
      });
    });
  });
});
