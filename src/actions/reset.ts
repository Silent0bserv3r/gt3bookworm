'use server';

import { ResetSchema } from '@/schema';
import { getUserByEmail } from '@/server/db/query/user';
import { z } from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid Email!' };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'Email not found' };
	}

	return { success: 'Reset Email Sent' };
};
