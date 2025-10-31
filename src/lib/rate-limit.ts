/**
 * Simple in-memory rate limiting
 * For production, use Redis (Upstash) for distributed rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the window
   */
  limit: number;
  /**
   * Time window in milliseconds
   */
  window: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request is rate limited
 * @param identifier - Unique identifier (e.g., IP address, user ID, email)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  let entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    entry = {
      count: 0,
      resetTime: now + config.window,
    };
    rateLimitStore.set(key, entry);
  }

  entry.count++;

  const success = entry.count <= config.limit;
  const remaining = Math.max(0, config.limit - entry.count);

  return {
    success,
    limit: config.limit,
    remaining,
    reset: entry.resetTime,
  };
}

/**
 * Rate limit middleware for API routes
 * @param identifier - Unique identifier for rate limiting
 * @param config - Rate limit configuration
 * @returns null if allowed, Response object if rate limited
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Response | null {
  const result = checkRateLimit(identifier, config);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: "Too many requests",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(result.limit),
          "X-RateLimit-Remaining": String(result.remaining),
          "X-RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
          "Retry-After": String(Math.ceil((result.reset - Date.now()) / 1000)),
        },
      }
    );
  }

  return null;
}

/**
 * Get client IP from request
 */
export function getClientIp(request: Request): string {
  // Check common headers for IP (proxies, load balancers)
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const cfConnectingIp = headers.get("cf-connecting-ip"); // Cloudflare

  if (forwarded) {
    // x-forwarded-for may contain multiple IPs, take the first one
    const firstIp = forwarded.split(",")[0];
    return firstIp ? firstIp.trim() : "unknown";
  }

  if (realIp) {
    return realIp.trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Fallback to a generic identifier
  return "unknown";
}

/**
 * Predefined rate limit configs
 */
export const RateLimitPresets = {
  // Very strict - for sensitive operations like login
  AUTH: { limit: 5, window: 15 * 60 * 1000 }, // 5 requests per 15 minutes

  // Strict - for API mutations
  API_WRITE: { limit: 20, window: 60 * 1000 }, // 20 requests per minute

  // Moderate - for API reads
  API_READ: { limit: 100, window: 60 * 1000 }, // 100 requests per minute

  // Lenient - for public endpoints
  PUBLIC: { limit: 50, window: 60 * 1000 }, // 50 requests per minute

  // Very lenient - for webhooks and integrations
  WEBHOOK: { limit: 1000, window: 60 * 1000 }, // 1000 requests per minute
};
