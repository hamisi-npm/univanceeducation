import { z } from "zod";

const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

const appEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
  IP_HASH_SALT: z.string().min(8).optional(),
});

const emailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  EMAIL_FROM: z.string().min(3, "EMAIL_FROM is required"),
  CONSULTATION_INBOX: z.email("CONSULTATION_INBOX must be a valid email"),
});

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;
export type AppEnv = z.infer<typeof appEnvSchema>;
export type EmailEnv = z.infer<typeof emailEnvSchema>;
export type ServerEnv = DatabaseEnv & AppEnv & EmailEnv;

let databaseCached: DatabaseEnv | null = null;
let appCached: AppEnv | null = null;
let emailCached: EmailEnv | null = null;

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("; ");
}

export function getDatabaseEnv(): DatabaseEnv {
  if (databaseCached) {
    return databaseCached;
  }

  const parsed = databaseEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!parsed.success) {
    throw new Error(`Invalid server environment: ${formatZodIssues(parsed.error)}`);
  }

  databaseCached = parsed.data;
  return databaseCached;
}

export function getAppEnv(): AppEnv {
  if (appCached) {
    return appCached;
  }

  const parsed = appEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    IP_HASH_SALT: process.env.IP_HASH_SALT,
  });

  if (!parsed.success) {
    throw new Error(`Invalid server environment: ${formatZodIssues(parsed.error)}`);
  }

  appCached = parsed.data;
  return appCached;
}

export function getEmailEnv(): EmailEnv {
  if (emailCached) {
    return emailCached;
  }

  const parsed = emailEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    CONSULTATION_INBOX: process.env.CONSULTATION_INBOX,
  });

  if (!parsed.success) {
    throw new Error(`Invalid server environment: ${formatZodIssues(parsed.error)}`);
  }

  emailCached = parsed.data;
  return emailCached;
}

/**
 * Full operational server env (database + app + email).
 * Prefer narrower getters when only a subset is needed.
 */
export function getServerEnv(): ServerEnv {
  return {
    ...getDatabaseEnv(),
    ...getAppEnv(),
    ...getEmailEnv(),
  };
}

/** Site origin without trailing slash — used for confirmation links. */
export function getSiteOrigin(): string {
  return getAppEnv().NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
}
