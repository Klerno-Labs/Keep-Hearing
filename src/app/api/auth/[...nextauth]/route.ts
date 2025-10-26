import { handlers } from "../../../../../auth";
import { rateLimit } from "../../rate-limit";
import { csrfGuard } from "../../csrf";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const limited = rateLimit(request);
	if (limited) return limited;
	return handlers.GET(request);
}

export async function POST(request: NextRequest) {
	const limited = rateLimit(request);
	if (limited) return limited;
	const csrf = csrfGuard(request);
	if (csrf) return csrf;
	return handlers.POST(request);
}
