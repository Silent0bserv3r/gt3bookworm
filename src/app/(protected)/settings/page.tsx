import { LogoutButton } from '@/components/auth/logout-button';
import { auth } from '@/server/auth';

export default async function SettingsPage() {
	const session = await auth();
	return (
		<div>
			<h1>Settings Page</h1>
			<code>{JSON.stringify(session)}</code>
			<LogoutButton />
		</div>
	);
}
