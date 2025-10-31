/**
 * Input sanitization utilities to prevent XSS attacks
 * For production, consider using DOMPurify for client-side sanitization
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Sanitize user input by removing potentially dangerous content
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, "");

  // Remove control characters except newline, tab, and carriage return
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  // Remove any whitespace
  let sanitized = email.replace(/\s/g, "");

  // Convert to lowercase
  sanitized = sanitized.toLowerCase();

  // Remove any characters that are not valid in email
  sanitized = sanitized.replace(/[^a-z0-9@._+-]/g, "");

  return sanitized;
}

/**
 * Sanitize user name
 */
export function sanitizeName(name: string): string {
  // Apply basic sanitization
  let sanitized = sanitizeInput(name);

  // Remove any HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, "");

  // Limit length
  sanitized = sanitized.substring(0, 100);

  return sanitized;
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(url: string): string {
  // Only allow http and https protocols
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

/**
 * Validate and sanitize CUID
 */
export function sanitizeCuid(cuid: string): string {
  // CUID format: starts with 'c' followed by timestamp and random chars
  const cuidRegex = /^c[a-z0-9]{24}$/i;
  return cuidRegex.test(cuid) ? cuid : "";
}

/**
 * Remove script tags and javascript: protocols
 */
export function removeScripts(text: string): string {
  // Remove script tags
  let sanitized = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "");

  // Remove on* event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, "");

  return sanitized;
}

/**
 * Sanitize object - recursively sanitize all string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeInput(item) :
        typeof item === "object" && item !== null ? sanitizeObject(item) :
        item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * SQL injection prevention - escape single quotes
 * Note: Use parameterized queries (Prisma) instead of manual escaping
 */
export function escapeSql(text: string): string {
  return text.replace(/'/g, "''");
}

/**
 * Check if string contains potential XSS payload
 */
export function containsXss(text: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ];

  return xssPatterns.some((pattern) => pattern.test(text));
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJson(jsonString: string): string | null {
  try {
    // Parse and re-stringify to remove any extra content
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    return null;
  }
}
