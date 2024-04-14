import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type SidebarButtonProps = {
	name: string;
	link: string;
	className?: string;
	Icon: () => React.ReactElement;
};

export const SidebarButton = ({
	name,
	link,
	className,
	Icon,
}: SidebarButtonProps) => {
	return (
		<Button
			asChild
			variant={'ghost'}
			size={'lg'}
			className={cn(
				'flex max-w-fit items-center justify-normal rounded-full px-3 py-6 text-xl font-semibold',
				className,
			)}
		>
			<Link href={link}>
				<Icon />
				<h1 className={'px-3.5'}>{name}</h1>
			</Link>
		</Button>
	);
};
