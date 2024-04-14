import { Sidebar } from '@/app/(protected)/_components/sidebar';
import React from 'react';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={'flex w-full max-w-7xl justify-between'}>
			<Sidebar />
			{children}
		</div>
	);
}
