// Simple CSRF token utility (for demo; use robust libs in production)
import { randomBytes } from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CSRF_COOKIE = 'csrfToken';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function setCsrfCookie(response: NextResponse, token: string) {
  response.headers.append('Set-Cookie', `${CSRF_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`);
}

export function verifyCsrfToken(request: NextRequest): boolean {
  const cookie = request.cookies.get(CSRF_COOKIE)?.value;
  const header = request.headers.get('x-csrf-token');
  return !!cookie && !!header && cookie === header;
}

export function csrfGuard(request: NextRequest): NextResponse | null {
  if (request.method === 'POST') {
    if (!verifyCsrfToken(request)) {
      return new NextResponse('CSRF token invalid', { status: 403 });
    }
  }
  return null;
}
