import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

/**
 * GET /api/audit - Get audit logs (admin only)
 */
export async function GET(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    // Return the 50 most recent audit log entries
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({
      logs: logs.map((log: any) => ({
        id: log.id,
        action: log.action,
        user: log.user?.name || 'System',
        userId: log.userId,
        date: log.createdAt.toLocaleString(),
        createdAt: log.createdAt,
      }))
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
