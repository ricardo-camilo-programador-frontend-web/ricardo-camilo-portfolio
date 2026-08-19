import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export const SITE = {
	name: "Ricardo Camilo",
	role: "Frontend Engineer",
	url: "https://ricardocamilo.dev",
	ogImage: "/og-image.png",
	sameAs: [
		"https://github.com/ricardo-camilo-programador-frontend-web",
		"https://linkedin.com/in/ricardocamilo",
	],
} as const;

const descriptions: Record<Locale, string> = {
	pt: "Portfolio profissional de Ricardo Camilo — Frontend Engineer especializado em React, TypeScript, Next.js e experiências web modernas.",
	en: "Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, Next.js, and modern web experiences.",
};

export const titles: Record<Locale, string> = {
	pt: "Ricardo Camilo | Frontend Engineer",
	en: "Ricardo Camilo | Frontend Engineer",
};

const keywords: Record<Locale, string[]> = {
	pt: [
		"Ricardo Camilo",
		"Frontend Engineer",
		"Desenvolvedor Frontend",
		"React",
		"TypeScript",
		"Next.js",
		"Tailwind CSS",
		"Portfolio",
		"Desenvolvimento Web",
	],
	en: [
		"Ricardo Camilo",
		"Frontend Engineer",
		"Frontend Developer",
		"React",
		"TypeScript",
		"Next.js",
		"Tailwind CSS",
		"Portfolio",
		"Web Development",
	],
};

const ogLocales: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

/** Localized Person, WebSite, ProfilePage, and BreadcrumbList JSON-LD for the given locale. */
export function getJsonLd(locale: Locale) {
	const url = `${SITE.url}/${locale}`;
	return {
		person: {
			"@context": "https://schema.org",
			"@type": "Person",
			name: SITE.name,
			url,
			jobTitle: SITE.role,
			sameAs: [...SITE.sameAs],
		},
		website: {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: `${SITE.name} | Portfolio`,
			url,
			description: descriptions[locale],
			inLanguage: locale === "pt" ? "pt-BR" : "en",
		},
		profilePage: {
			"@context": "https://schema.org",
			"@type": "ProfilePage",
			dateCreated: "2026-01-01T00:00:00Z",
			dateModified: new Date().toISOString(),
			mainEntity: {
				"@type": "Person",
				name: SITE.name,
				jobTitle: SITE.role,
				sameAs: [...SITE.sameAs],
			},
		},
		breadcrumb: {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: url,
				},
			],
		},
	};
}

/** Localized base metadata for each locale root. */
export function buildMetadata(locale: Locale): Metadata {
	return {
		title: titles[locale],
		description: descriptions[locale],
		keywords: keywords[locale],
		authors: [{ name: SITE.name, url: SITE.url }],
		creator: SITE.name,
		publisher: SITE.name,
		metadataBase: new URL(SITE.url),
		alternates: {
			canonical: `/${locale}`,
			languages: { pt: "/pt", en: "/en" },
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		openGraph: {
			type: "website",
			url: `${SITE.url}/${locale}`,
			siteName: `${SITE.name} | Portfolio`,
			title: titles[locale],
			description: descriptions[locale],
			locale: ogLocales[locale],
			images: [
				{
					url: SITE.ogImage,
					width: 1200,
					height: 630,
					alt: `${SITE.name} — ${SITE.role}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: titles[locale],
			description: descriptions[locale],
			images: [SITE.ogImage],
			creator: "@ricardocamilo",
		},
	};
}
