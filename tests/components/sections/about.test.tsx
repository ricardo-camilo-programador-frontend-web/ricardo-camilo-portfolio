import { About } from "@/components/sections/About";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("About", () => {
	it("renders heading and bio description", () => {
		render(<About />);
		expect(screen.getByText("Sobre Mim")).toBeInTheDocument();
		expect(
			screen.getByText(/Desenvolvedor frontend apaixonado/),
		).toBeInTheDocument();
	});

	it("renders skills list", () => {
		render(<About />);
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Next.js")).toBeInTheDocument();
	});
});
