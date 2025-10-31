import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

/**
 * Combined dashboard endpoint to reduce API calls
 * Returns donations total, recent donations, and analytics in one request
 */
export async function GET() {
  try {
    const session = await requireAdmin();

    // Fetch all data in parallel
    const [totalDonation, recentDonations] = await Promise.all([
      // Total donations
      prisma.donation.aggregate({
        _sum: {
          amountCents: true,
        },
      }),

      // Recent donations
      prisma.donation.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    // Convert cents to dollars
    const total = totalDonation._sum.amountCents ? totalDonation._sum.amountCents / 100 : 0;

    const donations = recentDonations.map((donation) => ({
      id: donation.id,
      name: donation.user?.name || "Anonymous",
      amount: Number(donation.amountCents) / 100,
      date: donation.createdAt.toISOString(),
    }));

    return NextResponse.json({
      total,
      donations,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
