import { db } from '@/server/db';
import { verificationTokens } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const tokens = await db
			.select()
			.from(verificationTokens)
			.where(eq(verificationTokens.email, email))
			.limit(1);
		return tokens[0];
	} catch (_error) {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const tokens = await db
			.selectDistinct()
			.from(verificationTokens)
			.where(eq(verificationTokens.token, token));
		return tokens[0];
	} catch (_error) {
		return null;
	}
};

export const deleteVerficationTokenById = async (id: string) => {
	try {
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.id, id));
	} catch (_error) {
		return null;
	}
};

type VerificationTokenParams = typeof verificationTokens.$inferInsert;
export const createNewVerificationToken = async (
	tokenParams: VerificationTokenParams,
) => {
	try {
		return await db
			.insert(verificationTokens)
			.values(tokenParams)
			.returning();
	} catch (_error) {
		return null;
	}
};
