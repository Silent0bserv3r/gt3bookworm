'use server';

import { sendResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schema';
import { getUserByEmail } from '@/server/db/query/user';
import { z } from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	try {
		const validatedFields = ResetSchema.safeParse(values);

		if (!validatedFields.success) {
			return { error: 'Invalid Email!' };
		}

		const { email } = validatedFields.data;

		const existingUser = await getUserByEmail(email);

		if (!existingUser) {
			return { error: 'Email not found' };
		}

		const resetToken = await generatePasswordResetToken(email);

		if (resetToken) {
			await sendResetEmail(resetToken.email, resetToken.token);
		} else {
			return { error: 'Oops! Something went wrong' };
		}
	} catch {
		return { error: 'Oops! Something went wrong' };
	}

	return { success: 'Reset Email Sent' };
};
