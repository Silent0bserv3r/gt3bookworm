import { env } from '@/env';
import { LoginSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getUserByEmail } from '../db/query/user';

export default {
	providers: [
		Google,
		Github,
		Credentials({
			authorize: async (credentials) => {
				const validatedFields = LoginSchema.safeParse(credentials);
				const isProduction = env.NODE_ENV === 'production';

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(
						password,
						user.password,
					);

					const isUserVerfied = !!user.emailVerified;

					if (passwordMatch) {
						if (!isProduction) {
							return user;
						}

						if (isUserVerfied) {
							return user;
						} else {
							return null;
						}
					}
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
