import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | Ricardo Camilo",
		default: "Ricardo Camilo | Frontend Engineer",
	},
	description:
		"Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, and modern web experiences.",
	keywords: [
		"Ricardo Camilo",
		"Frontend Engineer",
		"React",
		"TypeScript",
		"Next.js",
		"Portfolio",
	],
	authors: [{ name: "Ricardo Camilo" }],
	creator: "Ricardo Camilo",
	metadataBase: new URL("https://ricardocamilo.dev"),
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
		locale: "pt_BR",
		siteName: "Ricardo Camilo | Portfolio",
		title: "Ricardo Camilo | Frontend Engineer",
		description:
			"Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, and modern web experiences.",
		url: "https://ricardocamilo.dev",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Ricardo Camilo — Frontend Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ricardo Camilo | Frontend Engineer",
		description:
			"Professional portfolio of Ricardo Camilo — Frontend Engineer specializing in React, TypeScript, and modern web experiences.",
		images: ["/og-image.png"],
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
		shortcut: "/icon.png",
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
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider>
					<Header />
					<main className="container mx-auto px-4 pb-16">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
