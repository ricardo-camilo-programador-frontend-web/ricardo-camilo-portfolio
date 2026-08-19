import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Card({
	className,
	title,
	children,
	...props
}: HTMLAttributes<HTMLDivElement> & { title?: string }) {
	return (
		<div
			className={cn("rounded border bg-white p-4 shadow", className)}
			{...props}
		>
			{title ? <h3 className="mb-2 font-semibold">{title}</h3> : null}
			<div>{children}</div>
		</div>
	);
}

export function CardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("mb-4 flex flex-col gap-1.5", className)} {...props} />
	);
}

export function CardTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3 className={cn("font-semibold leading-none", className)} {...props} />
	);
}

export function CardDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}

export function CardContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mt-4 flex items-center", className)} {...props} />;
}
