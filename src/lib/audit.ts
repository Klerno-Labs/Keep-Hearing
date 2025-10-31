import { prisma } from "./prisma";

/**
 * Audit log actions enum
 */
export enum AuditAction {
  // User actions
  USER_CREATED = "USER_CREATED",
  USER_UPDATED = "USER_UPDATED",
  USER_DELETED = "USER_DELETED",
  USER_RESTORED = "USER_RESTORED",
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  USER_LOGIN_FAILED = "USER_LOGIN_FAILED",

  // Admin actions
  ADMIN_LOGIN = "ADMIN_LOGIN",
  ADMIN_LOGOUT = "ADMIN_LOGOUT",
  ADMIN_ACCESS = "ADMIN_ACCESS",
  ADMIN_LOGIN_FAILED = "ADMIN_LOGIN_FAILED",

  // Donation actions
  DONATION_CREATED = "DONATION_CREATED",
  DONATION_UPDATED = "DONATION_UPDATED",
  DONATION_REFUNDED = "DONATION_REFUNDED",
  DONATION_MODIFIED = "DONATION_MODIFIED",
  PAYMENT_PROCESSED = "PAYMENT_PROCESSED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_CANCELED = "PAYMENT_CANCELED",

  // Settings actions
  SETTINGS_UPDATED = "SETTINGS_UPDATED",
  SETTINGS_VIEWED = "SETTINGS_VIEWED",

  // Report actions
  REPORT_EXPORTED = "REPORT_EXPORTED",
  REPORT_VIEWED = "REPORT_VIEWED",
  ANALYTICS_EXPORTED = "ANALYTICS_EXPORTED",

  // Security actions
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  TWO_FACTOR_ENABLED = "TWO_FACTOR_ENABLED",
  TWO_FACTOR_DISABLED = "TWO_FACTOR_DISABLED",
  FAILED_AUTH_ATTEMPT = "FAILED_AUTH_ATTEMPT",
}

/**
 * Log an audit event
 */
export async function logAudit(params: {
  action: AuditAction | string;
  userId?: string;
  details?: Record<string, any>;
}): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        userId: params.userId || null,
      },
    });
  } catch (error) {
    // Don't throw - audit logging should never break the main flow
    console.error("Failed to create audit log:", error);
  }
}

/**
 * Get recent audit logs
 */
export async function getAuditLogs(params?: {
  userId?: string;
  limit?: number;
  offset?: number;
}) {
  return await prisma.auditLog.findMany({
    where: params?.userId ? { userId: params.userId } : undefined,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: params?.limit || 50,
    skip: params?.offset || 0,
  });
}
