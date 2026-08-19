import { describe, expect, it } from "vitest";
import manifest from "../app/manifest";

describe("pwa", () => {
	it("manifest provides correct metadata for PWA installation", () => {
		const m = manifest();
		expect(m.name).toBe("Ricardo Camilo — Portfolio");
		expect(m.short_name).toBe("RC Portfolio");
		expect(m.display).toBe("standalone");
		expect(m.start_url).toBe("/");
		expect(m.background_color).toBe("#090d16");
		expect(m.theme_color).toBe("#3b82f6");
		expect(m.icons).toBeDefined();
		expect(m.icons?.length).toBeGreaterThan(0);
	});
});
