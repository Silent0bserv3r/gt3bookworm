'use client';

import { reset } from '@/actions/reset';
import { NewPasswordSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormError } from '../general/form-error';
import { FormSuccess } from '../general/form-success';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { CardWrapper } from './card-wrapper';

export const NewPasswordForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('');
		setSuccess('');

		// startTransition(() => {
		// 	reset(values).then((data) => {
		// 		setError(data?.error);
		// 		setSuccess(data?.success);
		// 	});
		// });

		form.reset();
	};

	return (
		<CardWrapper
			headerLabel="Forgot your password?"
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
		>
			<Form {...form}>
				<form
					className="space-y-6"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="•••••••••"
											type="password"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="•••••••••"
											type="password"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						className="w-full"
						type="submit"
						disabled={isPending}
					>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
