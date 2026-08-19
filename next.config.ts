import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	outputFileTracingRoot: __dirname,
	compress: true,
	reactStrictMode: true,
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
	headers: async () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "X-DNS-Prefetch-Control",
					value: "on",
				},
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload",
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff",
				},
				{
					key: "X-Frame-Options",
					value: "SAMEORIGIN",
				},
				{
					key: "Referrer-Policy",
					value: "origin-when-cross-origin",
				},
			],
		},
		{
			source: "/sw.js",
			headers: [
				{
					key: "Cache-Control",
					value: "public, max-age=0, must-revalidate",
				},
			],
		},
		{
			source: "/static/:path*",
			headers: [
				{
					key: "Cache-Control",
					value: "public, max-age=31536000, immutable",
				},
			],
		},
	],
};

export default createNextIntlPlugin()(nextConfig);
