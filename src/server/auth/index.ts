import { env } from '@/env';
import { OAuthAccountNotLinked } from '@auth/core/errors';
import { DefaultSession } from '@auth/core/types';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from 'next-auth/jwt';

import { db } from '../db';
import { getUserById } from '../db/query/user';
import { users } from '../db/schema';
import authConfig from './config';

declare module 'next-auth' {
	interface Session {
		user: {
			role: 'admin' | 'user';
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: 'admin' | 'user';
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		linkAccount: async ({ user }) => {
			if (user.id) {
				await db
					.update(users)
					.set({ emailVerified: new Date() })
					.where(eq(users.id, user.id));
			}
		},
	},
	callbacks: {
		signIn: async ({ user, account }) => {
			if (account?.provider !== 'credentials') return true;

			if (!user.id) return false;
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;

			// TODO: Add 2FA check

			return true;
		},
		session: async ({ session, token }) => {
			if (session.user) {
				if (token.sub) {
					session.user.id = token.sub;
				}

				if (token.role) {
					session.user.role = token.role;
				}
			}

			return session;
		},
		jwt: async ({ token }) => {
			if (!token.sub) return token;
			const user = await getUserById(token.sub);

			if (!user) return token;

			token.role = user.role;

			return token;
		},
	},
	...authConfig,
	adapter: DrizzleAdapter(db),
	session: { strategy: 'jwt' },
});
