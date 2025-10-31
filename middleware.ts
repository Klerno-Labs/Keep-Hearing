import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
	// Check authentication for admin routes
	if (request.nextUrl.pathname.startsWith('/admin')) {
		const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

		if (!token) {
			return NextResponse.redirect(new URL('/signin?error=unauthorized', request.url));
		}

		// Check if user has admin role
		if (token.role !== 'ADMIN' && token.role !== 'SUPERADMIN') {
			return NextResponse.redirect(new URL('/signin?error=forbidden', request.url));
		}
	}

	const response = NextResponse.next();

	// Security headers - Improved CSP
	response.headers.set('Content-Security-Policy', [
		"default-src 'self';",
		"script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live;",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
		"img-src 'self' data: https:;",
		"font-src 'self' https://fonts.gstatic.com data:;",
		"connect-src 'self' https://vercel.live https://api.vercel.com;",
		"frame-src 'self';",
		"object-src 'none';",
		"base-uri 'self';",
		"form-action 'self';"
	].join(' '));

	// Additional security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// HSTS - Force HTTPS for 1 year (only in production)
	if (process.env.NODE_ENV === 'production') {
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
	}

	// XSS Protection (legacy but still useful)
	response.headers.set('X-XSS-Protection', '1; mode=block');

	return response;
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
