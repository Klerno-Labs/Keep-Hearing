

import { Auth } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

const authConfig = {
	adapter: PrismaAdapter(prisma),
		session: { strategy: "database" as const },
	providers: [
		Credentials({
			name: "Email & Password",
			credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
							async authorize(credentials) {
								const email = credentials.email as string | undefined;
								const password = credentials.password as string | undefined;
								if (!email || !password) return null;
								const user = await prisma.user.findUnique({ where: { email } });
								if (!user?.password) return null;
								const ok = await compare(password, user.password);
								return ok ? user : null;
							}
		})
	],
	pages: { signIn: "/signin" }
};

export async function middleware(request: Request) {
	const response = await Auth(request, authConfig);
	// Protect /admin routes
	if (request.url.includes("/admin") && response.status === 401) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}
	return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
