// Simple in-memory rate limiter for demonstration (production: use Redis or similar)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;
const ipHits: Record<string, { count: number; start: number }> = {};

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  if (!ipHits[ip] || now - ipHits[ip].start > WINDOW_MS) {
    ipHits[ip] = { count: 1, start: now };
    return null;
  }
  ipHits[ip].count++;
  if (ipHits[ip].count > MAX_REQUESTS) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  return null;
}
