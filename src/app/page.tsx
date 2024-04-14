import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { auth } from '@/server/auth';
import { Poppins } from 'next/font/google';
import { redirect } from 'next/navigation';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

export default async function Home() {
	const session = await auth();
	if (!!session) redirect('/settings');

	return (
		<main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
			<div className="space-y-6 text-center">
				<h1
					className={cn(
						'text-6xl font-semibold text-white drop-shadow-md',
						font.className,
					)}
				>
					🔐Auth
				</h1>
				<p className="text-lg text-white ">A simple auth service</p>
				<div>
					<LoginButton>
						<Button variant={'secondary'} size={'lg'}>
							Sign In
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}
