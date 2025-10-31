import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

/**
 * GET /api/analytics - Get comprehensive site analytics (admin only)
 * Supports optional date range filtering via query params:
 * ?start_date=2024-01-01&end_date=2024-12-31
 */
export async function GET(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    // Get date range from query params (default: all time)
    const url = new URL(req.url);
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');

    // Build date filter
    const dateFilter = startDate && endDate ? {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    } : {};

    // Get comprehensive analytics data
    const [
      donationCount,
      userCount,
      activeUserCount,
      deletedUserCount,
      totalAmountResult,
      averageDonationResult,
      recurringDonationCount,
      thisMonthDonations,
      lastMonthDonations,
      donationsByProvider,
      recentDonors,
      topDonors,
      contactSubmissionsTotal,
      contactSubmissionsNew,
      contactSubmissionsThisMonth,
      contactSubmissionsLastMonth
    ] = await Promise.all([
      // Total donations
      prisma.donation.count({ where: dateFilter }),

      // Total users
      prisma.user.count(),

      // Active users (not deleted)
      prisma.user.count({ where: { deletedAt: null } }),

      // Deleted users
      prisma.user.count({ where: { deletedAt: { not: null } } }),

      // Total amount
      prisma.donation.aggregate({
        where: dateFilter,
        _sum: { amountCents: true }
      }),

      // Average donation
      prisma.donation.aggregate({
        where: dateFilter,
        _avg: { amountCents: true }
      }),

      // Recurring donations
      prisma.donation.count({
        where: { ...dateFilter, recurring: true }
      }),

      // This month's donations
      prisma.donation.aggregate({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { amountCents: true },
        _count: true
      }),

      // Last month's donations
      prisma.donation.aggregate({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { amountCents: true },
        _count: true
      }),

      // Donations by payment provider
      prisma.donation.groupBy({
        by: ['provider'],
        where: dateFilter,
        _sum: { amountCents: true },
        _count: true
      }),

      // Recent unique donors (last 30 days)
      prisma.donation.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        distinct: ['userId'],
        select: { userId: true }
      }),

      // Top donors
      prisma.donation.groupBy({
        by: ['userId'],
        where: { userId: { not: null }, ...dateFilter },
        _sum: { amountCents: true },
        _count: true,
        orderBy: { _sum: { amountCents: 'desc' } },
        take: 5
      }),

      // Contact submissions total
      prisma.contactSubmission.count({ where: dateFilter }),

      // Contact submissions - new (unread)
      prisma.contactSubmission.count({
        where: { ...dateFilter, status: 'new' }
      }),

      // Contact submissions this month
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),

      // Contact submissions last month
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      })
    ]);

    const totalAmount = (totalAmountResult._sum.amountCents || 0) / 100;
    const averageDonation = (averageDonationResult._avg.amountCents || 0) / 100;
    const thisMonthTotal = (thisMonthDonations._sum.amountCents || 0) / 100;
    const lastMonthTotal = (lastMonthDonations._sum.amountCents || 0) / 100;

    // Calculate growth
    const monthOverMonthGrowth = lastMonthTotal > 0
      ? parseFloat(((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1))
      : thisMonthTotal > 0 ? 100 : 0;

    const contactGrowth = contactSubmissionsLastMonth > 0
      ? parseFloat(((contactSubmissionsThisMonth - contactSubmissionsLastMonth) / contactSubmissionsLastMonth * 100).toFixed(1))
      : contactSubmissionsThisMonth > 0 ? 100 : 0;

    return NextResponse.json({
      // Basic stats
      donationCount,
      userCount,
      activeUserCount,
      deletedUserCount,
      totalAmount,
      averageDonation,
      recurringDonationCount,

      // Monthly comparison
      thisMonth: {
        total: thisMonthTotal,
        count: thisMonthDonations._count
      },
      lastMonth: {
        total: lastMonthTotal,
        count: lastMonthDonations._count
      },
      monthOverMonthGrowth,

      // Provider breakdown
      byProvider: donationsByProvider.map(p => ({
        provider: p.provider,
        total: (p._sum.amountCents || 0) / 100,
        count: p._count
      })),

      // Donor stats
      recentDonorCount: recentDonors.filter(d => d.userId).length,
      topDonors: topDonors.map(d => ({
        userId: d.userId,
        total: (d._sum.amountCents || 0) / 100,
        count: d._count
      })),

      // Calculated metrics
      recurringPercentage: donationCount > 0
        ? parseFloat(((recurringDonationCount / donationCount) * 100).toFixed(1))
        : 0,

      // Contact submission analytics
      contactSubmissions: {
        total: contactSubmissionsTotal,
        new: contactSubmissionsNew,
        thisMonth: contactSubmissionsThisMonth,
        lastMonth: contactSubmissionsLastMonth,
        growth: contactGrowth,
        responseRate: contactSubmissionsTotal > 0
          ? parseFloat((((contactSubmissionsTotal - contactSubmissionsNew) / contactSubmissionsTotal) * 100).toFixed(1))
          : 0
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
