import { Hero } from "@/components/sections/Hero";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Hero", () => {
	it("renders main heading and title", () => {
		render(<Hero />);
		expect(screen.getByText("Ricardo Camilo")).toBeInTheDocument();
		expect(screen.getByText(/Frontend Engineer/)).toBeInTheDocument();
	});

	it("renders call to action buttons", () => {
		render(<Hero />);
		expect(screen.getByText("Ver Projetos")).toBeInTheDocument();
		expect(screen.getByText("Download CV")).toBeInTheDocument();
	});
});
