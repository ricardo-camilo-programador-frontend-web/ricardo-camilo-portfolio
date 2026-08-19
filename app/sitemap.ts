import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://ricardocamilo.dev";

	const routes = [
		{ path: "/pt", priority: 0.8, changeFrequency: "weekly" as const },
		{ path: "/en", priority: 0.8, changeFrequency: "weekly" as const },
		{
			path: "/pt/projetos",
			priority: 0.7,
			changeFrequency: "monthly" as const,
		},
		{ path: "/pt/contato", priority: 0.7, changeFrequency: "monthly" as const },
		{
			path: "/en/projetos",
			priority: 0.7,
			changeFrequency: "monthly" as const,
		},
		{ path: "/en/contato", priority: 0.7, changeFrequency: "monthly" as const },
	];

	return routes.map((route) => ({
		url: `${baseUrl}${route.path}`,
		lastModified: new Date(),
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));
}
