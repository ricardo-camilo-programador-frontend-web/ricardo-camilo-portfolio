import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { LanguageToggle } from "../../src/components/LanguageToggle";

test("LanguageToggle renders PT button", () => {
	render(<LanguageToggle />);
	expect(screen.getByRole("button", { name: /pt/i })).toBeInTheDocument();
});

test("LanguageToggle renders EN button", () => {
	render(<LanguageToggle />);
	expect(screen.getByRole("button", { name: /en/i })).toBeInTheDocument();
});

test("LanguageToggle calls onLocaleChange with pt when PT clicked", () => {
	const onLocaleChange = vi.fn();
	render(<LanguageToggle onLocaleChange={onLocaleChange} />);
	fireEvent.click(screen.getByRole("button", { name: /pt/i }));
	expect(onLocaleChange).toHaveBeenCalledWith("pt");
});

test("LanguageToggle calls onLocaleChange with en when EN clicked", () => {
	const onLocaleChange = vi.fn();
	render(<LanguageToggle onLocaleChange={onLocaleChange} />);
	fireEvent.click(screen.getByRole("button", { name: /en/i }));
	expect(onLocaleChange).toHaveBeenCalledWith("en");
});

test("LanguageToggle highlights active locale", () => {
	render(<LanguageToggle onLocaleChange={vi.fn()} activeLocale="pt" />);
	const ptButton = screen.getByRole("button", { name: /pt/i });
	expect(ptButton).toHaveAttribute("aria-pressed", "true");
});
