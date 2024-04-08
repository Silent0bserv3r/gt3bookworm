import { env } from '@/env';
import { type Config } from 'drizzle-kit';

export default {
	schema: './src/server/db/schema.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
	tablesFilter: ['bookworm_*'],
} satisfies Config;
