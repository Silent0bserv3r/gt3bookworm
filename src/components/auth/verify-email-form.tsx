'use client';

import { newVerification } from '@/actions/verify-email';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';

import { FormError } from '../general/form-error';
import { FormSuccess } from '../general/form-success';
import { CardWrapper } from './card-wrapper';

export const VerifyEmailForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (!token) {
			setError('Missing token');
			return;
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError('Oops! Something went wrong');
			});
	}, [token]);

	useEffect(() => onSubmit(), [onSubmit]);
	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<div className="flex w-full items-center justify-center">
				{!success && !error && (
					<ImSpinner className="duration-[5000ms] size-10 animate-spin" />
				)}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	);
};
