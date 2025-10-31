import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./src/lib/prisma";
import { compare } from "bcryptjs";
import { logAudit, AuditAction } from "./src/lib/audit";
import { checkRateLimit, RateLimitPresets } from "./src/lib/rate-limit";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) {
          // Log failed attempt - no email/password provided
          await logAudit({
            action: AuditAction.FAILED_AUTH_ATTEMPT,
          });
          return null;
        }

        // Rate limiting by email to prevent brute force
        const rateLimitResult = checkRateLimit(
          `auth:${String(creds.email).toLowerCase()}`,
          RateLimitPresets.AUTH
        );

        if (!rateLimitResult.success) {
          // Log rate limit exceeded
          await logAudit({
            action: AuditAction.FAILED_AUTH_ATTEMPT,
          });
          throw new Error(
            `Too many login attempts. Please try again in ${Math.ceil((rateLimitResult.reset - Date.now()) / 1000 / 60)} minutes.`
          );
        }

        const user = await prisma.user.findUnique({
          where: { email: String(creds.email) },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            image: true,
            deletedAt: true,
          }
        });

        // Check if user is soft deleted
        if (user?.deletedAt) {
          await logAudit({
            action: AuditAction.USER_LOGIN_FAILED,
            userId: user.id,
          });
          return null;
        }

        if (!user?.password) {
          // Log failed attempt - user not found
          await logAudit({
            action: AuditAction.USER_LOGIN_FAILED,
          });
          return null;
        }

        const passwordValid = await compare(creds.password as string, user.password);
        if (!passwordValid) {
          // Log failed attempt - invalid password
          await logAudit({
            action: AuditAction.USER_LOGIN_FAILED,
            userId: user.id,
          });
          return null;
        }

        // Log successful login
        const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN";
        await logAudit({
          action: isAdmin ? AuditAction.ADMIN_LOGIN : AuditAction.USER_LOGIN,
          userId: user.id,
        });

        // Don't return password or deletedAt in the session
        const { password, deletedAt, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/signin" }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
