import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const Social = () => {
	const login = async (provider: 'google' | 'github') => {
		signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
	};
	return (
		<div className="flex w-full flex-col space-y-4">
			<div
				id="divider"
				className="flex items-center justify-center gap-x-4"
			>
				<Separator className="w-7/20" />
				<h1 className="text-xs font-semibold text-slate-400">or</h1>
				<Separator className="w-7/20" />
			</div>
			<div className="flex w-full items-center gap-x-2">
				<Button
					size={'lg'}
					className="w-full"
					variant={'outline'}
					onClick={() => login('google')}
				>
					<FcGoogle className="h-5 w-5" />
				</Button>
				<Button
					size={'lg'}
					className="w-full"
					variant={'outline'}
					onClick={() => login('github')}
				>
					<FaGithub className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
};
