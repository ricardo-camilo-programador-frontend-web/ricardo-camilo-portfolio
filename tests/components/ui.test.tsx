import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Button, buttonVariants } from "../../src/components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/Card";
import { Modal } from "../../src/components/ui/Modal";

test("Button renders with text", () => {
	render(<Button>Click me</Button>);
	expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});

test("Button default variant is primary", () => {
	render(<Button>Click</Button>);
	expect(buttonVariants()).toContain("bg-blue-600");
});

test("Button applies variant classes", () => {
	const { rerender } = render(<Button variant="ghost">G</Button>);
	expect(buttonVariants({ variant: "ghost" })).toContain("bg-transparent");
	rerender(<Button variant="outline">O</Button>);
	expect(buttonVariants({ variant: "outline" })).toContain("border");
	rerender(<Button variant="secondary">S</Button>);
	expect(buttonVariants({ variant: "secondary" })).toContain("bg-gray-200");
});

test("Button applies size classes", () => {
	expect(buttonVariants({ size: "sm" })).toContain("px-2");
	expect(buttonVariants({ size: "md" })).toContain("px-4");
	expect(buttonVariants({ size: "lg" })).toContain("px-6");
});

test("Button disabled attribute", () => {
	render(<Button disabled>Nope</Button>);
	expect(screen.getByRole("button")).toBeDisabled();
});

test("Button loading shows spinner and disables", () => {
	render(<Button loading>Save</Button>);
	expect(screen.getByRole("button")).toBeDisabled();
	expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
});

test("Button merges className via cn", () => {
	render(<Button className="w-full">W</Button>);
	expect(screen.getByRole("button").className).toContain("w-full");
});

test("Card renders title and children", () => {
	render(<Card title="Test Card">Content</Card>);
	expect(screen.getByText("Test Card")).toBeInTheDocument();
	expect(screen.getByText("Content")).toBeInTheDocument();
});

test("Card compound subcomponents render", () => {
	render(
		<Card>
			<CardHeader>
				<CardTitle>Title X</CardTitle>
				<CardDescription>Description Y</CardDescription>
			</CardHeader>
			<CardContent>Body Z</CardContent>
			<CardFooter>Footer W</CardFooter>
		</Card>,
	);
	expect(screen.getByText("Title X")).toBeInTheDocument();
	expect(screen.getByText("Description Y")).toBeInTheDocument();
	expect(screen.getByText("Body Z")).toBeInTheDocument();
	expect(screen.getByText("Footer W")).toBeInTheDocument();
});

test("Modal renders children when open", () => {
	render(<Modal isOpen={true}>Hello</Modal>);
	expect(screen.getByText("Hello")).toBeInTheDocument();
});

test("Modal renders nothing when closed", () => {
	const { container } = render(<Modal isOpen={false}>Hello</Modal>);
	expect(container.firstChild).toBeNull();
});

test("Modal renders title", () => {
	render(
		<Modal isOpen={true} title="My Modal">
			Body
		</Modal>,
	);
	expect(screen.getByText("My Modal")).toBeInTheDocument();
});

test("Modal backdrop click calls onClose", () => {
	const onClose = vi.fn();
	render(
		<Modal isOpen={true} onClose={onClose}>
			Body
		</Modal>,
	);
	fireEvent.click(screen.getByRole("dialog").parentElement as HTMLElement);
	expect(onClose).toHaveBeenCalledTimes(1);
});

test("Modal content click does not close", () => {
	const onClose = vi.fn();
	render(
		<Modal isOpen={true} onClose={onClose}>
			Body
		</Modal>,
	);
	fireEvent.click(screen.getByText("Body"));
	expect(onClose).not.toHaveBeenCalled();
});
