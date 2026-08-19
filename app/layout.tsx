import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { SITE } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
