'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function SettingsPage() {
	const session = useCurrentUser();
	return (
		<div>
			<h1>Settings Page</h1>
			<code>{JSON.stringify(session)}</code>
			<Button
				onClick={() =>
					signOut({
						callbackUrl: '/',
					})
				}
			>
				Sign Out
			</Button>
		</div>
	);
}
