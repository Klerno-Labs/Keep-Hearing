import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from '../signin/page';

describe('SignInPage', () => {
  it('renders sign in form', () => {
    render(<SignInPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('shows error on invalid credentials', async () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'badpass' } });
    fireEvent.click(screen.getByText('Sign In'));
    // Simulate error (would need to mock signIn for real test)
    expect(await screen.findByText(/Invalid email or password/)).toBeInTheDocument();
  });
});
