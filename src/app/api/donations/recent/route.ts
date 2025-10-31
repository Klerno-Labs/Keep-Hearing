import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

/**
 * GET /api/donations/recent - Get recent donations (admin only)
 */
export async function GET(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    // Get the 10 most recent donations
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
    });

    return NextResponse.json({
      donations: donations.map((d: any) => ({
        id: d.id,
        name: d.user?.name || "Anonymous",
        email: d.user?.email || "N/A",
        amount: d.amountCents / 100, // convert cents to dollars
        currency: d.currency,
        provider: d.provider,
        recurring: d.recurring,
        date: d.createdAt.toLocaleDateString(),
      }))
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent donations' },
      { status: 500 }
    );
  }
}
