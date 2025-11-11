import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'app/configs/schema.js', // avoid .jsx unless it has actual JSX code
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_aMZeuKH14CLr@ep-calm-bird-a48n2kvi-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
  }
});
