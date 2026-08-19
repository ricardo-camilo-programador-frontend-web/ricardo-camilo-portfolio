import { getRequestConfig } from "next-intl/server";
import { type Locale, defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
	const resolvedLocale: Locale =
		locale && locales.includes(locale as Locale)
			? (locale as Locale)
			: defaultLocale;

	return {
		messages: (await import(`./messages/${resolvedLocale}.json`)).default,
		timeZone: "America/Sao_Paulo" as const,
		locale: resolvedLocale,
	};
});
