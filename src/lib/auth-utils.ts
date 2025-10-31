import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth';

export type AuthSession = {
	user: {
		id: string;
		email: string;
		name?: string;
		role: 'STAFF' | 'ADMIN' | 'SUPERADMIN';
	};
};

/**
 * Check if user is authenticated
 * Returns session or null
 */
export async function getAuthSession(): Promise<AuthSession | null> {
	const session = await auth();
	return session as AuthSession | null;
}

/**
 * Require authentication for API routes
 * Returns session or error response
 */
export async function requireAuth(
	request?: NextRequest
): Promise<{ session: AuthSession } | { error: NextResponse }> {
	const session = await getAuthSession();

	if (!session) {
		return {
			error: NextResponse.json(
				{ error: 'Unauthorized - Please sign in' },
				{ status: 401 }
			),
		};
	}

	return { session };
}

/**
 * Require admin role for API routes
 * Returns session or error response
 */
export async function requireAdmin(
	request?: NextRequest
): Promise<{ session: AuthSession } | { error: NextResponse }> {
	const authResult = await requireAuth(request);

	if ('error' in authResult) {
		return authResult;
	}

	const { session } = authResult;

	if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
		return {
			error: NextResponse.json(
				{ error: 'Forbidden - Admin access required' },
				{ status: 403 }
			),
		};
	}

	return { session };
}

/**
 * Check if user has specific role
 */
export function hasRole(
	session: AuthSession | null,
	role: 'STAFF' | 'ADMIN' | 'SUPERADMIN'
): boolean {
	if (!session) return false;
	return session.user.role === role;
}

/**
 * Check if user is admin or superadmin
 */
export function isAdmin(session: AuthSession | null): boolean {
	if (!session) return false;
	return session.user.role === 'ADMIN' || session.user.role === 'SUPERADMIN';
}
