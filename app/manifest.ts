import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Ricardo Camilo — Portfolio",
		short_name: "RC Portfolio",
		description:
			"Portfolio profissional de Ricardo Camilo — Frontend Engineer especializado em React, TypeScript e Next.js.",
		start_url: "/",
		display: "standalone",
		background_color: "#090d16",
		theme_color: "#3b82f6",
		icons: [
			{
				src: "/icon.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
			{
				src: "/og-image.png",
				sizes: "1200x630",
				type: "image/png",
			},
		],
	};
}
