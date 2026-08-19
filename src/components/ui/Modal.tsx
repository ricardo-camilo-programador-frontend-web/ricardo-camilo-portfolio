import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface ModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	title?: ReactNode;
	children?: ReactNode;
	className?: string;
}

export function Modal({
	isOpen = false,
	onClose,
	title,
	children,
	className,
}: ModalProps) {
	if (!isOpen) return null;
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onClick={onClose}
			data-testid="modal-backdrop"
		>
			<div
				role="dialog"
				aria-modal="true"
				className={cn(
					"w-full max-w-lg rounded bg-white p-4 shadow-lg",
					className,
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{title ? <h2 className="mb-2 text-lg font-semibold">{title}</h2> : null}
				{children}
			</div>
		</div>
	);
}
