import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import type { GitHubRepo } from "@/types";

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
	const response = await fetch(
		"https://api.github.com/users/ricardo-camilo-programador-frontend-web/repos?per_page=10&sort=updated",
		{ next: { revalidate: 3600 } },
	);

	if (!response.ok) {
		return [];
	}

	const repos = await response.json();
	return repos;
}

export default async function Home() {
	const repos = await fetchGitHubRepos();

	return (
		<>
			<Hero />
			<main className="container mx-auto px-4 pb-16">
				<Projects repos={repos} />
			</main>
			<About />
		</>
	);
}
