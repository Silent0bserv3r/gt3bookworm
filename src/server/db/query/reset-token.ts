import { eq } from 'drizzle-orm';

import { db } from '..';
import { passwordResetTokens } from '../schema';

export const getResetTokenByToken = async (token: string) => {
	try {
		const resetToken = await db
			.selectDistinct()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.token, token));

		return resetToken[0];
	} catch (_error) {
		return null;
	}
};

export const getResetTokenByEmail = async (email: string) => {
	try {
		const resetToken = await db
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.email, email))
			.limit(1);

		return resetToken[0];
	} catch (_error) {
		return null;
	}
};

type ResetTokenParams = typeof passwordResetTokens.$inferInsert;
export const createNewResetToken = async (tokenParams: ResetTokenParams) => {
	try {
		return await db
			.insert(passwordResetTokens)
			.values(tokenParams)
			.returning();
	} catch (_error) {
		return null;
	}
};
