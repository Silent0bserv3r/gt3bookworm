'use server';

import { dbCall } from '@/lib/utils';
import { NewPasswordSchema } from '@/schema';
import { db } from '@/server/db';
import { getResetTokenByToken } from '@/server/db/query/reset-token';
import { getUserByEmail } from '@/server/db/query/user';
import { passwordResetTokens, users } from '@/server/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { type z } from 'zod';

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token?: string | null,
) => {
	if (!token) return { error: 'Missing token' };

	const validatedFields = NewPasswordSchema.safeParse(values);
	if (!validatedFields.success) return { error: 'Invalid input' };

	const { password } = validatedFields.data;
	const existingToken = await getResetTokenByToken(token);

	if (!existingToken) return { error: 'Invalid token' };

	const hasExpired = existingToken.expires < new Date();
	if (hasExpired) return { error: 'Token has expired' };

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) return { error: 'User account not found' };

	const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

	await dbCall(async () => {
		await db
			.update(users)
			.set({ password: hashedPassword })
			.where(eq(users.id, existingUser.id));
	});

	await dbCall(async () => {
		await db
			.delete(passwordResetTokens)
			.where(eq(passwordResetTokens.id, existingToken.id));
	});

	return { success: 'Password is successfully changed' };
};
