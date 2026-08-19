import { Footer } from "@/components/Footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Footer", () => {
	it("renders social links and copyright notice", () => {
		render(<Footer />);
		expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
		expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
		expect(screen.getByText(/Ricardo Camilo/)).toBeInTheDocument();
	});
});
