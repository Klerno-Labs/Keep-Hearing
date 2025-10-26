import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	response.headers.set('Content-Security-Policy', [
		"default-src 'self';",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live;",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
		"img-src 'self' data: https:;",
		"font-src 'self' https://fonts.gstatic.com data:;",
		"connect-src 'self' https://vercel.live https://api.vercel.com;",
		"frame-src 'self';",
		"object-src 'none';",
		"base-uri 'self';",
		"form-action 'self';"
	].join(' '));
	return response;
}
