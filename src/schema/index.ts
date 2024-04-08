import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Email cannot be empty' }).email(),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
	email: z.string().min(1, { message: 'Email cannot be empty' }).email(),
	password: z.string().min(6, { message: 'Password is too short' }),
	name: z.string().min(1, { message: 'Name is required' }),
});
