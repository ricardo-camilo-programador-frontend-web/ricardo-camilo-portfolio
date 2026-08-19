import { locales } from "@/i18n/config";
import { SITE } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	// ponytail: single page per locale; add per-route entries when real subroutes exist
	return locales.map((locale) => ({
		url: `${SITE.url}/${locale}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 1,
		alternates: {
			languages: Object.fromEntries(
				locales.map((alt) => [alt, `${SITE.url}/${alt}`]),
			),
		},
	}));
}
