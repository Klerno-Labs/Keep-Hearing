import { z } from 'zod';
import { sanitizeEmail, sanitizeName, containsXss } from './sanitize';

// Custom refinements for security
const noXssString = (fieldName: string) => z.string().refine(
	(val) => !containsXss(val),
	{ message: `${fieldName} contains potentially malicious content` }
);

// User validation schemas
export const CreateUserSchema = z.object({
	email: z.string().email('Invalid email address')
		.refine((val) => !containsXss(val), 'Email contains potentially malicious content')
		.transform(sanitizeEmail),
	name: z.string().min(1, 'Name is required').max(100, 'Name too long')
		.refine((val) => !containsXss(val), 'Name contains potentially malicious content')
		.transform(sanitizeName),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
	role: z.enum(['STAFF', 'ADMIN', 'SUPERADMIN']).optional().default('STAFF'),
});

export const UpdateUserSchema = z.object({
	id: z.string().cuid('Invalid user ID'),
	email: z.string().email('Invalid email address')
		.refine((val) => !containsXss(val), 'Email contains potentially malicious content')
		.transform(sanitizeEmail)
		.optional(),
	name: z.string().min(1, 'Name is required').max(100, 'Name too long')
		.refine((val) => !containsXss(val), 'Name contains potentially malicious content')
		.transform(sanitizeName)
		.optional(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
		.optional(),
	role: z.enum(['STAFF', 'ADMIN', 'SUPERADMIN']).optional(),
});

export const DeleteUserSchema = z.object({
	id: z.string().cuid('Invalid user ID'),
});

// Donation validation schemas
export const CreateDonationSchema = z.object({
	userId: z.string().cuid('Invalid user ID').optional(),
	amountCents: z.number().int().positive('Amount must be positive'),
	currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
	provider: z.enum(['stripe', 'paypal']),
	providerId: z.string().min(1, 'Provider ID is required'),
	recurring: z.boolean().default(false),
});

// Audit log validation
export const CreateAuditLogSchema = z.object({
	userId: z.string().cuid('Invalid user ID').optional(),
	action: z.string().min(1, 'Action is required'),
	details: z.record(z.any()).optional(),
});

// Helper function to validate and parse data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown):
	{ success: true; data: T } | { success: false; error: string } {
	try {
		const parsed = schema.parse(data);
		return { success: true, data: parsed };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const firstError = error.errors[0];
			if (firstError) {
				return {
					success: false,
					error: `${firstError.path.join('.')}: ${firstError.message}`
				};
			}
		}
		return { success: false, error: 'Invalid data provided' };
	}
}
