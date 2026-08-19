import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { type Locale, locales } from "@/i18n/config";
import { getJsonLd } from "@/lib/seo";
import type { GitHubRepo } from "@/types";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const About = dynamic(
	() => import("@/components/sections/About").then((mod) => mod.About),
	{ ssr: true },
);
const Contact = dynamic(
	() => import("@/components/sections/Contact").then((mod) => mod.Contact),
	{ ssr: true },
);
const Projects = dynamic(
	() => import("@/components/sections/Projects").then((mod) => mod.Projects),
	{ ssr: true },
);

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

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!locales.includes(locale as Locale)) {
		notFound();
	}
	const { person, website, profilePage, breadcrumb } = getJsonLd(
		locale as Locale,
	);
	const repos = await fetchGitHubRepos();

	return (
		<>
			<JsonLd data={person} />
			<JsonLd data={website} />
			<JsonLd data={profilePage} />
			<JsonLd data={breadcrumb} />
			<Hero />
			<main id="main-content" className="container mx-auto px-4 pb-16">
				<Projects repos={repos} />
			</main>
			<About />
			<Contact />
		</>
	);
}
