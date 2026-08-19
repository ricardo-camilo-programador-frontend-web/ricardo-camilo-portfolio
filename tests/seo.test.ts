import { locales } from "@/i18n/config";
import { SITE, buildMetadata, getJsonLd, titles } from "@/lib/seo";
import { describe, expect, it } from "vitest";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("seo", () => {
	it("builds localized JSON-LD per locale including ProfilePage and BreadcrumbList", () => {
		for (const locale of locales) {
			const { person, website, profilePage, breadcrumb } = getJsonLd(locale);
			expect(person["@type"]).toBe("Person");
			expect(person.url).toBe(`${SITE.url}/${locale}`);
			expect(website.inLanguage).toBe(locale === "pt" ? "pt-BR" : "en");
			expect(profilePage["@type"]).toBe("ProfilePage");
			expect(breadcrumb["@type"]).toBe("BreadcrumbList");
		}
	});

	it("builds localized metadata with keywords and alternates", () => {
		const meta = buildMetadata("en");
		expect(meta.title).toBe(titles.en);
		expect(meta.alternates?.canonical).toBe("/en");
		expect(meta.openGraph?.locale).toBe("en_US");
		expect(meta.keywords).toContain("Frontend Engineer");
		expect(meta.robots).toBeDefined();
	});

	it("sitemap covers every locale with hreflang alternates", () => {
		const urls = sitemap().map((e) => e.url);
		expect(urls).toEqual(locales.map((l) => `${SITE.url}/${l}`));
	});

	it("robots points at sitemap and specifies rules", () => {
		const r = robots();
		expect(r.sitemap).toBe(`${SITE.url}/sitemap.xml`);
		expect(r.rules).toBeDefined();
	});
});
