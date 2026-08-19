import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-blue-600 text-white hover:bg-blue-700",
				primary: "bg-blue-600 text-white hover:bg-blue-700",
				secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
				ghost: "bg-transparent hover:bg-gray-100",
				outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
			},
			size: {
				sm: "px-2 py-1 text-sm",
				md: "px-4 py-2",
				lg: "px-6 py-3 text-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

export function Button({
	className,
	variant,
	size,
	loading = false,
	disabled,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
			) : null}
			{children}
		</button>
	);
}
