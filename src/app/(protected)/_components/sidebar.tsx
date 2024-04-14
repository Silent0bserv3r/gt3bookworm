import { SidebarButton } from '@/app/(protected)/_components/sidebar-button';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export const Sidebar = () => {
	return (
		<div
			className={
				'flex h-screen w-[30%] flex-col items-start space-y-2 p-3'
			}
		>
			<Button
				className={'size-12 rounded-full p-2'}
				variant={'ghost'}
				size={'icon'}
				asChild
			>
				<Image
					src={'/bookworm.png'}
					alt={'logo'}
					width={20}
					height={20}
				/>
			</Button>
			<SidebarButton
				name={'Home'}
				link={'/home'}
				Icon={() => <AiFillHome className={'size-7'} />}
			/>
			<SidebarButton
				name={'Explore'}
				link={'/explore'}
				Icon={() => <HiMagnifyingGlass className={'size-7'} />}
			/>
			<SidebarButton
				name={'Profile'}
				link={'/profile'}
				Icon={() => <CiUser strokeWidth={1} className={'size-7'} />}
			/>
			<Button
				variant={'default'}
				size={'lg'}
				className={
					'w-3/4 rounded-full bg-blue-500 p-3 py-6 text-lg hover:bg-blue-600'
				}
				asChild
			>
				<Link href={'/new-post'}>New Post</Link>
			</Button>
		</div>
	);
};
