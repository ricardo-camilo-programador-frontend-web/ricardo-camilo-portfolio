import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { type Locale, defaultLocale, locales } from "@/i18n/config";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const titles: Record<Locale, string> = {
	pt: "Ricardo Camilo | Frontend Engineer",
	en: "Ricardo Camilo | Frontend Engineer",
};

const descriptions: Record<Locale, string> = {
	pt: "Portfolio profissional de Ricardo Camilo — Frontend Engineer especializado em React, TypeScript e experiências web modernas.",
	en: "Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, and modern web experiences.",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = locale as Locale;

	if (!locales.includes(resolvedLocale)) {
		notFound();
	}

	return {
		title: titles[resolvedLocale],
		description: descriptions[resolvedLocale],
		alternates: {
			canonical: `/${resolvedLocale}`,
			languages: {
				pt: "/pt",
				en: "/en",
			},
		},
		openGraph: {
			locale: resolvedLocale === "pt" ? "pt_BR" : "en_US",
			siteName: "Ricardo Camilo | Portfolio",
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const resolvedLocale: Locale = locale as Locale;
	const messages = await getMessages({ locale: resolvedLocale });

	return (
		<NextIntlClientProvider messages={messages} locale={resolvedLocale}>
			<ThemeProvider>
				<Header />
				<main className="container mx-auto px-4 pb-16">{children}</main>
				<Footer />
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
