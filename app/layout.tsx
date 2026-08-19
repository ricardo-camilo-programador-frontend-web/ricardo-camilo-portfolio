import { SITE } from "@/lib/seo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	preload: true,
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: {
		template: "%s | Ricardo Camilo",
		default: "Ricardo Camilo | Frontend Engineer",
	},
	authors: [{ name: SITE.name }],
	creator: SITE.name,
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
};

async function getLocale() {
	try {
		const cookieStore = await cookies();
		const locale = cookieStore.get("NEXT_LOCALE")?.value;
		if (locale === "en") return "en";
		return "pt";
	} catch {
		return "pt";
	}
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();
	return (
		<html lang={locale} suppressHydrationWarning className={inter.variable}>
			<head>
				<link rel="preconnect" href="https://api.github.com" />
				<link rel="dns-prefetch" href="https://api.github.com" />
			</head>
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
