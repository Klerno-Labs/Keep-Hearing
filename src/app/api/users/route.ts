import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { CreateUserSchema, UpdateUserSchema, DeleteUserSchema, validateData } from "@/lib/validation";
import { hash } from "bcryptjs";
import { logAudit, AuditAction } from "@/lib/audit";

/**
 * GET /api/users - Get all users (admin only)
 */
export async function GET(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    // Get show_deleted query parameter
    const url = new URL(req.url);
    const showDeleted = url.searchParams.get('show_deleted') === 'true';

    const users = await prisma.user.findMany({
      where: showDeleted ? undefined : { deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create a new user (admin only)
 */
export async function POST(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(CreateUserSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { email, name, password, role } = validation.data as {
      email: string;
      name: string;
      password: string;
      role?: 'STAFF' | 'ADMIN' | 'SUPERADMIN';
    };

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || 'STAFF',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });

    // Log user creation
    await logAudit({
      action: AuditAction.USER_CREATED,
      userId: authResult.session.user.id,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users - Update a user (admin only)
 */
export async function PUT(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(UpdateUserSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { id, email, name, password, role } = validation.data as {
      id: string;
      email?: string;
      name?: string;
      password?: string;
      role?: 'STAFF' | 'ADMIN' | 'SUPERADMIN';
    };

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await hash(password, 10);
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      }
    });

    // Log user update
    await logAudit({
      action: AuditAction.USER_UPDATED,
      userId: authResult.session.user.id,
    });

    // Log password change if password was updated
    if (password) {
      await logAudit({
        action: AuditAction.PASSWORD_CHANGED,
        userId: authResult.session.user.id,
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users - Delete a user (admin only)
 */
export async function DELETE(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(DeleteUserSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { id } = validation.data as { id: string };

    // Prevent deleting yourself
    if (id === authResult.session.user.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Soft delete user by setting deletedAt timestamp
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    // Log the deletion
    await logAudit({
      action: AuditAction.USER_DELETED,
      userId: authResult.session.user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users - Restore a deleted user (admin only)
 */
export async function PATCH(req: NextRequest) {
  // Check authentication and authorization
  const authResult = await requireAdmin(req);
  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists and is deleted
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.deletedAt) {
      return NextResponse.json(
        { error: 'User is not deleted' },
        { status: 400 }
      );
    }

    // Restore user by clearing deletedAt
    const restoredUser = await prisma.user.update({
      where: { id },
      data: { deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      }
    });

    // Log the restoration
    await logAudit({
      action: AuditAction.USER_RESTORED,
      userId: authResult.session.user.id,
    });

    return NextResponse.json({ user: restoredUser });
  } catch (error) {
    console.error('Error restoring user:', error);
    return NextResponse.json(
      { error: 'Failed to restore user' },
      { status: 500 }
    );
  }
}
