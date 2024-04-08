'use server';

import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schema';
import { signIn, signOut } from '@/server/auth';
import { getUserByEmail } from '@/server/db/query/user';
import { AuthError } from 'next-auth';
import { z } from 'zod';

import { DEFAULT_LOGIN_REDIRECT } from './../routes';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success) return { error: 'Invalid Fields' };

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email does not exists' };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);
		return { success: 'Email is not verified. Check your Inbox' };
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials' };
				default:
					return { error: 'Something went wrong' };
			}
		}

		throw error;
	}
};

export const handleLogOut = async () => {
	await signOut();
};
