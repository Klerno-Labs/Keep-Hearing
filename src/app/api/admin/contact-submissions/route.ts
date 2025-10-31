import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { logAudit } from "@/lib/audit";

// GET /api/admin/contact-submissions - Fetch all contact submissions
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(request);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = status ? { status } : {};

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json({
      submissions,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/contact-submissions - Update submission status
export async function PATCH(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(request);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const session = authResult.session;

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    if (!["new", "read", "archived"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: new, read, or archived" },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    await logAudit(
      session.user.id,
      `Updated contact submission ${id} status to ${status}`
    );

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Error updating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to update contact submission" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contact-submissions - Delete a submission
export async function DELETE(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(request);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const session = authResult.session;

    // Only superadmins can delete
    if (session.user.role !== "SUPERADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Only superadmins can delete submissions." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing submission ID" },
        { status: 400 }
      );
    }

    await prisma.contactSubmission.delete({
      where: { id },
    });

    await logAudit(session.user.id, `Deleted contact submission ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return NextResponse.json(
      { error: "Failed to delete contact submission" },
      { status: 500 }
    );
  }
}
