import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
	message?: string;
}

export const FormSuccess = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div className="flex items-center gap-x-3 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
			<CheckCircledIcon className="size-4" />
			<p>{message}</p>
		</div>
	);
};
