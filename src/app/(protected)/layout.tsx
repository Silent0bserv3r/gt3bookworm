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
				'flex h-full w-full flex-col items-center gap-y-10 ',
				'bg-white',
			)}
		>
			{children}
		</div>
	);
}
