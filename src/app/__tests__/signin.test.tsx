declare global {
  // eslint-disable-next-line no-var
  var mockSignIn: jest.Mock;
}
beforeAll(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    redirected: false,
    type: 'basic',
    url: '/api/csrf-token',
    headers: new Headers(),
  json: () => Promise.resolve({ token: 'test-csrf-token' }),
  text: () => Promise.resolve(''),
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  blob: () => Promise.resolve(new Blob()),
  bytes: () => Promise.resolve(new Uint8Array()),
  formData: () => Promise.resolve(new FormData()),
  clone: function() { return this; },
  body: null,
  bodyUsed: false,
  }));
});
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
}));
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from '../signin/page';

jest.mock('next-auth/react', () => {
  const mockSignIn = jest.fn();
  global.mockSignIn = mockSignIn;
  return {
    signIn: (...args: any[]) => mockSignIn(...args),
    useSession: () => ({ data: null, status: 'unauthenticated' }),
  };
});

describe('SignInPage', () => {
  it('renders sign in form', async () => {
    render(<SignInPage />);
    expect(await screen.findByPlaceholderText('Email')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
    // There are multiple elements with 'Sign In', so check for the button
    const signInButtons = await screen.findAllByText('Sign In');
    // Find the button by role and text
    const signInButton = await screen.findByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeInTheDocument();
    expect(signInButtons.length).toBeGreaterThan(1);
  });

  it('shows error on invalid credentials', async () => {
    global.mockSignIn.mockResolvedValueOnce({ error: 'Invalid email or password' });
    render(<SignInPage />);
    fireEvent.change(await screen.findByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(await screen.findByPlaceholderText('Password'), { target: { value: 'badpass' } });
    fireEvent.click(await screen.findByRole('button', { name: 'Sign In' }));
    expect(await screen.findByText(/Invalid email or password/)).toBeInTheDocument();
  });
});
