'use server';

import { db } from '@/server/db';
import { getUserByEmail } from '@/server/db/query/user';
import { getVerificationTokenByToken } from '@/server/db/query/verification-token';
import { users, verificationTokens } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) return { error: 'Token does not exist!' };

	if (existingToken.expires < new Date()) {
		return { error: 'Token has expired' };
	}

	const user = await getUserByEmail(existingToken.email);

	if (!user) {
		return { error: 'Email does not exists' };
	}

	try {
		await db
			.update(users)
			.set({ emailVerified: new Date(), email: existingToken.email })
			.where(eq(users.id, user.id));
	} catch {
		return { error: 'Oops! Something went wrong' };
	}

	try {
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.id, existingToken.id));
	} catch {
		return { error: 'Oops! Something went wrong' };
	}

	return { success: 'Email verified successfully' };
};
