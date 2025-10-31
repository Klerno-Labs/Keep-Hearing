/**
 * Security tests for user API endpoints
 * Tests authentication, authorization, and input validation
 */

import { NextRequest } from "next/server";
import { GET, POST, PUT, DELETE } from "../route";

// Mock dependencies
jest.mock("@/lib/auth-utils", () => ({
  requireAdmin: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("@/lib/audit", () => ({
  logAudit: jest.fn(),
  AuditAction: {
    USER_CREATED: "USER_CREATED",
    USER_UPDATED: "USER_UPDATED",
    USER_DELETED: "USER_DELETED",
  },
}));

import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

describe("User API Security", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Authentication", () => {
    it("should reject GET request without authentication", async () => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        error: { json: () => ({ error: "Unauthorized" }), status: 401 },
      });

      const req = new NextRequest("http://localhost:3000/api/users");
      const response = await GET(req);

      expect(requireAdmin).toHaveBeenCalled();
      expect(response.status).toBe(401);
    });

    it("should reject POST request without authentication", async () => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        error: { json: () => ({ error: "Unauthorized" }), status: 401 },
      });

      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "Password123",
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(401);
    });

    it("should reject PUT request without authentication", async () => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        error: { json: () => ({ error: "Unauthorized" }), status: 401 },
      });

      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "PUT",
        body: JSON.stringify({
          id: "user-id",
          name: "Updated Name",
        }),
      });

      const response = await PUT(req);
      expect(response.status).toBe(401);
    });

    it("should reject DELETE request without authentication", async () => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        error: { json: () => ({ error: "Unauthorized" }), status: 401 },
      });

      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "DELETE",
        body: JSON.stringify({ id: "user-id" }),
      });

      const response = await DELETE(req);
      expect(response.status).toBe(401);
    });
  });

  describe("Authorization", () => {
    it("should reject non-admin user", async () => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        error: { json: () => ({ error: "Forbidden" }), status: 403 },
      });

      const req = new NextRequest("http://localhost:3000/api/users");
      const response = await GET(req);

      expect(response.status).toBe(403);
    });
  });

  describe("Input Validation", () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        session: {
          user: { id: "admin-id", email: "admin@test.com", role: "ADMIN" },
        },
      });
    });

    it("should reject invalid email format", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "invalid-email",
          password: "Password123",
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("email");
    });

    it("should reject weak password", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "weak",
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("password");
    });

    it("should reject missing required fields", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });

    it("should reject invalid role", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "Password123",
          role: "INVALID_ROLE",
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("role");
    });
  });

  describe("Password Security", () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        session: {
          user: { id: "admin-id", email: "admin@test.com", role: "ADMIN" },
        },
      });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: "new-user-id",
        name: "Test User",
        email: "test@example.com",
        role: "STAFF",
      });
    });

    it("should hash password before storing", async () => {
      const plainPassword = "Password123";
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: plainPassword,
        }),
      });

      await POST(req);

      expect(prisma.user.create).toHaveBeenCalled();
      const createCall = (prisma.user.create as jest.Mock).mock.calls[0][0];
      // Password should be hashed, not plaintext
      expect(createCall.data.password).not.toBe(plainPassword);
      expect(createCall.data.password).toHaveLength(60); // bcrypt hash length
    });

    it("should not return password in response", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "Password123",
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(data.user).toBeDefined();
      expect(data.user.password).toBeUndefined();
    });
  });

  describe("SQL Injection Protection", () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        session: {
          user: { id: "admin-id", email: "admin@test.com", role: "ADMIN" },
        },
      });
    });

    it("should handle SQL injection attempts in email", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test'; DROP TABLE users; --",
          password: "Password123",
        }),
      });

      const response = await POST(req);
      // Should fail validation before reaching database
      expect(response.status).toBe(400);
    });
  });

  describe("Self-Deletion Protection", () => {
    beforeEach(() => {
      (requireAdmin as jest.Mock).mockResolvedValue({
        session: {
          user: { id: "admin-id", email: "admin@test.com", role: "ADMIN" },
        },
      });
    });

    it("should prevent admin from deleting themselves", async () => {
      const req = new NextRequest("http://localhost:3000/api/users", {
        method: "DELETE",
        body: JSON.stringify({ id: "admin-id" }),
      });

      const response = await DELETE(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("Cannot delete your own account");
    });
  });
});
