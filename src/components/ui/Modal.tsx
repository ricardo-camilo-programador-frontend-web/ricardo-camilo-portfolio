import type { KeyboardEvent } from "react";
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

	const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
		if (e.key === "Escape") onClose?.();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onClick={onClose}
			onKeyDown={handleKeyDown}
			data-testid="modal-backdrop"
		>
			<dialog
				open
				aria-modal="true"
				className={cn(
					"w-full max-w-lg rounded bg-white p-4 shadow-lg",
					className,
				)}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				{title ? <h2 className="mb-2 text-lg font-semibold">{title}</h2> : null}
				{children}
			</dialog>
		</div>
	);
}
