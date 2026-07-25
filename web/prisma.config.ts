/**
 * Prisma CLI config (Prisma 7).
 *
 * Supabase split:
 * - DIRECT_URL  → used here for migrate / db push / introspect (direct Postgres :5432)
 * - DATABASE_URL → transaction pooler (:6543 / PgBouncer) for app runtime via driver adapter
 *   (wired later when creating PrismaClient — not used by the CLI)
 *
 * @see https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql
 */
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
