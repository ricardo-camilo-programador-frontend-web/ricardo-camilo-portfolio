import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { GitHubRepo } from "@/types";
import { Projects } from "../../../src/components/sections/Projects";

const mockRepos: GitHubRepo[] = [
	{
		id: 1,
		name: "ricardo-camilo-portfolio",
		description: "Professional portfolio built with Next.js 15",
		html_url:
			"https://github.com/ricardo-camilo-programador-frontend-web/ricardo-camilo-portfolio",
		language: "TypeScript",
		stargazers_count: 5,
		topics: ["nextjs", "react", "typescript"],
		updated_at: "2025-01-15T10:30:00Z",
	},
	{
		id: 2,
		name: "sgs-web-utils",
		description: "Utility library for SGS_WEB",
		html_url:
			"https://github.com/ricardo-camilo-programador-frontend-web/sgs-web-utils",
		language: "TypeScript",
		stargazers_count: 3,
		topics: ["vue", "typescript"],
		updated_at: "2025-01-10T08:00:00Z",
	},
];

test("Projects renders section title", () => {
	render(<Projects repos={mockRepos} />);
	expect(screen.getByText("Projetos")).toBeInTheDocument();
});

test("Projects renders repo name", () => {
	render(<Projects repos={mockRepos} />);
	expect(screen.getByText("ricardo-camilo-portfolio")).toBeInTheDocument();
});

test("Projects renders repo description", () => {
	render(<Projects repos={mockRepos} />);
	expect(
		screen.getByText("Professional portfolio built with Next.js 15"),
	).toBeInTheDocument();
});

test("Projects renders language", () => {
	render(<Projects repos={mockRepos} />);
	expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(2);
});

test("Projects renders star count", () => {
	render(<Projects repos={mockRepos} />);
	expect(screen.getByText("5")).toBeInTheDocument();
});

test("Projects renders GitHub link with correct href", () => {
	render(<Projects repos={mockRepos} />);
	const link = screen.getByLabelText("Ver ricardo-camilo-portfolio no GitHub");
	expect(link).toHaveAttribute(
		"href",
		"https://github.com/ricardo-camilo-programador-frontend-web/ricardo-camilo-portfolio",
	);
	expect(link).toHaveAttribute("target", "_blank");
	expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("Projects renders topics", () => {
	render(<Projects repos={mockRepos} />);
	expect(screen.getByText("nextjs")).toBeInTheDocument();
});

test("Projects renders aria-label on link", () => {
	render(<Projects repos={mockRepos} />);
	expect(
		screen.getByLabelText("Ver ricardo-camilo-portfolio no GitHub"),
	).toBeInTheDocument();
});

test("Projects handles empty repos array", () => {
	render(<Projects repos={[]} />);
	expect(screen.getByText("Projetos")).toBeInTheDocument();
});
