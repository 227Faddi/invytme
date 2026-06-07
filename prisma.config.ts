import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load both .env and .env.local (Next.js convention)
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
