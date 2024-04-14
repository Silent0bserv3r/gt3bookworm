import {
	createNewResetToken,
	getResetTokenByEmail,
} from '@/server/db/query/reset-token';
import {
	createNewVerificationToken,
	deleteVerificationTokenById,
	getVerificationTokenByEmail,
} from '@/server/db/query/verification-token';
import { v4 as uuidv4 } from 'uuid';

export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getResetTokenByEmail(email);

	if (existingToken) {
		await deleteVerificationTokenById(existingToken.id);
	}

	const newToken = await createNewResetToken({
		email,
		token,
		expires,
	});

	if (!newToken) return null;

	return newToken[0];
};

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await deleteVerificationTokenById(existingToken.id);
	}

	const newToken = await createNewVerificationToken({
		email,
		token,
		expires,
	});

	if (!newToken) return null;

	return newToken[0];
};
