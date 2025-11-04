import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth-utils";
import { logAudit, AuditAction } from "@/lib/audit";
import { CreateDonationSchema, validateData } from "@/lib/validation";

/**
 * GET /api/donations
 * Get all donations (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const donations = await prisma.donation.findMany({
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
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error("Failed to fetch donations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/donations
 * Create a new donation
 * Note: This endpoint is public to support anonymous donations via payment webhooks
 * Authentication is optional - authenticated users get donation linked to their account
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    // Validate input using Zod schema
    const validation = validateData(CreateDonationSchema, {
      userId: body.userId,
      amountCents: body.amountCents || (body.amount ? Math.round(body.amount * 100) : undefined),
      currency: body.currency,
      provider: body.provider,
      providerId: body.providerId,
      recurring: body.recurring,
    });

    if (!validation.success) {
      await logAudit({
        action: AuditAction.PAYMENT_FAILED,
        userId: session?.user?.id,
      });
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { amountCents, userId, provider, providerId, recurring, currency } = validation.data;

    // Security: Maximum donation limit ($1,000,000)
    const MAX_DONATION_CENTS = 100000000;
    if (amountCents > MAX_DONATION_CENTS) {
      await logAudit({
        action: AuditAction.PAYMENT_FAILED,
        userId: session?.user?.id,
      });
      return NextResponse.json(
        { error: `Maximum donation amount is $${MAX_DONATION_CENTS / 100}` },
        { status: 400 }
      );
    }

    // Check for duplicate providerId to prevent double-charging
    const existingDonation = await prisma.donation.findFirst({
      where: {
        provider,
        providerId,
      },
    });

    if (existingDonation) {
      return NextResponse.json(
        { error: "Donation already recorded", donation: existingDonation },
        { status: 409 }
      );
    }

    // If userId provided, verify it exists
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    const donation = await prisma.donation.create({
      data: {
        amountCents,
        userId: userId || (session?.user?.id ? session.user.id : null),
        provider,
        providerId,
        recurring: recurring || false,
        currency: currency || "USD",
      },
    });

    // Log donation creation
    await logAudit({
      action: AuditAction.DONATION_CREATED,
      userId: session?.user?.id || userId,
    });

    // Log payment processing
    await logAudit({
      action: AuditAction.PAYMENT_PROCESSED,
      userId: session?.user?.id || userId,
    });

    return NextResponse.json({ donation }, { status: 201 });
  } catch (error) {
    console.error("Failed to create donation:", error);

    // Log payment failure
    const session = await getAuthSession();
    await logAudit({
      action: AuditAction.PAYMENT_FAILED,
      userId: session?.user?.id,
    });

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/donations
 * Update a donation (admin only) - for modifications
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, amount, recurring, provider } = body;

    if (!id) {
      return NextResponse.json({ error: "Donation ID required" }, { status: 400 });
    }

    const updateData: any = {};
    if (amount !== undefined) updateData.amountCents = Math.round(amount * 100);
    if (recurring !== undefined) updateData.recurring = recurring;
    if (provider !== undefined) updateData.provider = provider;

    const donation = await prisma.donation.update({
      where: { id },
      data: updateData,
    });

    // Log donation modification
    await logAudit({
      action: AuditAction.DONATION_MODIFIED,
      userId: session.user.id,
    });

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("Failed to update donation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/donations
 * Refund a donation (admin only)
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Donation ID required" }, { status: 400 });
    }

    // In a real system, you might soft-delete or mark as refunded
    // For now, we'll delete but log it thoroughly
    const donation = await prisma.donation.delete({
      where: { id },
    });

    // Log donation refund
    await logAudit({
      action: AuditAction.DONATION_REFUNDED,
      userId: session.user.id,
    });

    return NextResponse.json({
      message: "Donation refunded successfully",
      donation
    });
  } catch (error) {
    console.error("Failed to refund donation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
