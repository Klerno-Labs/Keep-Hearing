import { NextResponse } from 'next/server';
import { generateCsrfToken, setCsrfCookie } from './csrf';

export async function GET() {
  const token = generateCsrfToken();
  const response = NextResponse.json({ token });
  setCsrfCookie(response, token);
  return response;
}
