"use client";

interface JsonLdProps {
	data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script injection
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
			suppressHydrationWarning
		/>
	);
}

export const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Ricardo Camilo",
	url: "https://ricardocamilo.dev",
	jobTitle: "Frontend Engineer",
	sameAs: [
		"https://github.com/ricardo-camilo-programador-frontend-web",
		"https://linkedin.com/in/ricardocamilo",
	],
};

export const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Ricardo Camilo | Portfolio",
	url: "https://ricardocamilo.dev",
	description:
		"Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, and modern web experiences.",
	inLanguage: ["pt-BR", "en"],
};
