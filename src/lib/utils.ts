import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function resolveInXSeconds(x: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, x * 1000);
	});
}

export async function dbCall(callback: () => Promise<void>) {
	try {
		await callback();
	} catch {
		return { error: 'Oops! something went wrong' };
	}
}
