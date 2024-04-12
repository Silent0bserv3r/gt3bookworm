'use client';

import { register } from '@/actions/register';
import { cn } from '@/lib/utils';
import { RegisterSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { LiaSpinnerSolid } from 'react-icons/lia';
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

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('');
		setSuccess('');

		startTransition(async () => {
			console.log('register started');
			const data = await register(values);
			setError(data.error);
			setSuccess(data.success);
			if (data.success && !data.error)
				setTimeout(() => router.push('/auth/login'), 3000);
		});

		// form.reset();
	};

	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonHref="/auth/login"
			backButtonLabel="Already have an Account?"
			showSocial
		>
			<Form {...form}>
				<form
					className="space-y-5"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="space-y-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="John Doe"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
											autoComplete="off"
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
						className="flex w-full items-center gap-x-1"
						type="submit"
						disabled={isPending}
					>
						<LiaSpinnerSolid
							className={cn(
								'hidden animate-spin',
								isPending && 'flex',
							)}
						/>
						<h1>Register</h1>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
