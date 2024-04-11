import { env } from '@/env';
import { Resend } from 'resend';

import { resetTemplate, verificationTemplate } from './template';
import TokenVerificationTemplate from './template/verification';

const resend = new Resend(env.RESEND_API_KEY);

export const passwordResetEmail = async (email: string, token: string) => {
	const confirmLink = `${env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

	await resend.emails.send({
		from: 'bookworm@codebug.in',
		to: email,
		subject: 'BookWorm: Reset Your Password',
		react: resetTemplate(confirmLink),
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

	await resend.emails.send({
		from: 'bookworm@codebug.in',
		to: email,
		subject: 'Bookworm: Email Verification',
		react: TokenVerificationTemplate(confirmLink),
	});
};
