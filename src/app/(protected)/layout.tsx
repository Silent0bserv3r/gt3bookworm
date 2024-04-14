import { Navbar } from '@/app/(protected)/_components/navbar';
import { cn } from '@/lib/utils';
import React from 'react';

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				'flex h-full w-full flex-col items-center justify-center gap-y-10 ',
				'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-400 to-blue-800',
			)}
		>
			<Navbar />
			{children}
		</div>
	);
}
