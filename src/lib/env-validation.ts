/**
 * Environment Variable Validation Utility
 *
 * Validates required environment variables on app startup
 * Provides helpful error messages if variables are missing or invalid
 */

type EnvCheck = {
  name: string;
  required: boolean;
  validate?: (value: string) => boolean;
  description: string;
  example?: string;
};

const envChecks: EnvCheck[] = [
  // Required Core Variables
  {
    name: "DATABASE_URL",
    required: true,
    validate: (val) => val.startsWith("postgres://") || val.startsWith("postgresql://"),
    description: "PostgreSQL database connection string",
    example: "postgresql://user:pass@host:5432/db",
  },
  {
    name: "AUTH_SECRET",
    required: true,
    validate: (val) => val.length >= 32,
    description: "NextAuth secret key (minimum 32 characters)",
    example: "Run: openssl rand -base64 32",
  },
  {
    name: "NEXTAUTH_URL",
    required: true,
    validate: (val) => val.startsWith("http://") || val.startsWith("https://"),
    description: "Full URL of your application",
    example: "http://localhost:3000 or https://yourdomain.com",
  },
  {
    name: "NODE_ENV",
    required: true,
    validate: (val) => ["development", "production", "test"].includes(val),
    description: "Node environment",
    example: "development, production, or test",
  },

  // Optional but Recommended Variables
  {
    name: "RESEND_API_KEY",
    required: false,
    validate: (val) => val.startsWith("re_"),
    description: "Resend email service API key (for contact form emails)",
    example: "re_123456789abcdefg",
  },
  {
    name: "NEXT_PUBLIC_GA_MEASUREMENT_ID",
    required: false,
    validate: (val) => val.startsWith("G-"),
    description: "Google Analytics 4 Measurement ID",
    example: "G-XXXXXXXXXX",
  },
];

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  summary: string;
};

/**
 * Validate all environment variables
 */
export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const check of envChecks) {
    const value = process.env[check.name];

    // Check if required variable is missing
    if (check.required && !value) {
      errors.push(
        `❌ MISSING REQUIRED: ${check.name}\n   ${check.description}\n   ${check.example ? `Example: ${check.example}` : ""}`
      );
      continue;
    }

    // Check if optional variable is missing
    if (!check.required && !value) {
      warnings.push(
        `⚠️  MISSING OPTIONAL: ${check.name}\n   ${check.description}\n   ${check.example ? `Example: ${check.example}` : ""}`
      );
      continue;
    }

    // Validate value format if validator is provided
    if (value && check.validate && !check.validate(value)) {
      if (check.required) {
        errors.push(
          `❌ INVALID FORMAT: ${check.name}\n   ${check.description}\n   ${check.example ? `Example: ${check.example}` : ""}`
        );
      } else {
        warnings.push(
          `⚠️  INVALID FORMAT: ${check.name}\n   ${check.description}\n   ${check.example ? `Example: ${check.example}` : ""}`
        );
      }
    }
  }

  const valid = errors.length === 0;
  const summary = valid
    ? `✅ Environment validation passed${warnings.length > 0 ? ` with ${warnings.length} warning(s)` : ""}`
    : `❌ Environment validation failed with ${errors.length} error(s)`;

  return {
    valid,
    errors,
    warnings,
    summary,
  };
}

/**
 * Print validation results to console
 */
export function printValidationResults(result: ValidationResult): void {
  console.log("\n" + "=".repeat(60));
  console.log("🔍 ENVIRONMENT VALIDATION");
  console.log("=".repeat(60) + "\n");

  if (result.errors.length > 0) {
    console.log("ERRORS:\n");
    result.errors.forEach((error) => console.log(error + "\n"));
  }

  if (result.warnings.length > 0) {
    console.log("WARNINGS:\n");
    result.warnings.forEach((warning) => console.log(warning + "\n"));
  }

  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log("✅ All environment variables are configured correctly!\n");
  }

  console.log("=".repeat(60));
  console.log(result.summary);
  console.log("=".repeat(60) + "\n");
}

/**
 * Validate and throw error if validation fails
 * Use this in startup scripts or middleware
 */
export function validateEnvironmentOrThrow(): void {
  const result = validateEnvironment();
  printValidationResults(result);

  if (!result.valid) {
    throw new Error(
      `Environment validation failed. Please fix the errors above and restart the application.`
    );
  }
}

/**
 * Get environment info for debugging
 */
export function getEnvironmentInfo(): Record<string, any> {
  return {
    nodeEnv: process.env.NODE_ENV,
    hasDatabase: !!process.env.DATABASE_URL,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasGoogleAnalytics: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    timestamp: new Date().toISOString(),
  };
}
