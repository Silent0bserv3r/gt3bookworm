import { z } from 'zod';

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Both passwords should be same',
		path: ['confirmPassword'],
	});

export const ResetSchema = z.object({
	email: z.string().min(1, { message: 'Email cannot be empty' }).email(),
});

export const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Email cannot be empty' }).email(),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z
	.object({
		email: z.string().min(1, { message: 'Email cannot be empty' }).email(),
		password: z.string().min(6, { message: 'Password is too short' }),
		confirmPassword: z.string(),
		name: z.string().min(1, { message: 'Name is required' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Both passwords should be same',
		path: ['confirmPassword'],
	});
