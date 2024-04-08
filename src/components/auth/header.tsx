import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-y-4">
			<Image
				src={'/bookworm.png'}
				alt="BookWorm Logo"
				width={50}
				height={50}
				className="size-12"
			/>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
};
