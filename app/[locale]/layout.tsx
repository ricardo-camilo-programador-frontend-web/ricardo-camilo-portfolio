import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { type Locale, locales } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!locales.includes(locale as Locale)) {
		notFound();
	}
	return buildMetadata(locale as Locale);
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
				<ServiceWorkerRegister />
				<Header />
				<main className="container mx-auto px-4 pb-16">{children}</main>
				<Footer />
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
