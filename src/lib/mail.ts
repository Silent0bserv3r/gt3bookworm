import { env } from '@/env';
import { Resend } from 'resend';

import PasswordResetTemplate from './template/resetPassword';
import EmailVerificationTemplate from './template/verification';

const resend = new Resend(env.RESEND_API_KEY);

export const sendResetEmail = async (email: string, token: string) => {
	const confirmLink = `${env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'bookworm@codebug.in',
		to: email,
		subject: 'BookWorm: Reset Your Password',
		react: PasswordResetTemplate(confirmLink),
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

	await resend.emails.send({
		from: 'bookworm@codebug.in',
		to: email,
		subject: 'Bookworm: Email Verification',
		react: EmailVerificationTemplate(confirmLink),
	});
};
