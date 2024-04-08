'use server';

import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schema';
import { db } from '@/server/db';
import { getUserByEmail } from '@/server/db/query/user';
import { users } from '@/server/db/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);
	if (!validatedFields.success) return { error: 'Invalid Fields' };

	const { name, email, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

	const existingUser = await getUserByEmail(email);

	if (existingUser) return { error: 'Email already in use' };

	try {
		await db.insert(users).values({
			name: name,
			email: email,
			password: hashedPassword,
		});
	} catch (error) {
		return { error: 'Something went wrong. Try again' };
	}

	const verficationToken = await generateVerificationToken(email);

	return { success: 'Confirmation Email Sent. Check your Inbox' };
};