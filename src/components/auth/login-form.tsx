'use client';

import { login } from '@/actions/login';
import { LoginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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

export const LoginForm = () => {
	const searchParams = useSearchParams();
	var urlError = '';
	if (searchParams.get('error') === 'OAuthAccountNotLinked')
		urlError = 'Email already in use';
	if (searchParams.get('error') === 'OAuthCallbackError')
		urlError = 'Sign In cancelled';

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});

		// form.reset();
	};

	return (
		<CardWrapper
			headerLabel="Welcome Back"
			backButtonHref="/auth/register"
			backButtonLabel="Don't have an Account?"
			showSocial
		>
			<Form {...form}>
				<form
					className="space-y-6"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="john.doe@example.com"
											type="email"
											autoComplete="username"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
											autoComplete="current-password"
										/>
									</FormControl>
									<Button
										size={'sm'}
										variant={'link'}
										className="px-0 font-normal"
									>
										<Link href="/auth/reset">
											Forgot Password?
										</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						className="w-full"
						type="submit"
						disabled={isPending}
					>
						Sign In
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
