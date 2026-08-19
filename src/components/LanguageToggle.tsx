import { type Locale, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
	activeLocale?: Locale;
	onLocaleChange?: (locale: Locale) => void;
}

export function LanguageToggle({
	activeLocale = "pt",
	onLocaleChange,
}: LanguageToggleProps) {
	return (
		<div className="inline-flex items-center gap-1 rounded-md bg-muted p-1 text-sm font-medium">
			<button
				type="button"
				onClick={() => onLocaleChange?.("pt")}
				aria-pressed={activeLocale === "pt"}
				className={cn(
					"rounded px-2 py-1 text-xs font-medium",
					activeLocale === "pt"
						? "bg-background text-foreground shadow"
						: "hover:bg-background/50",
				)}
			>
				PT
			</button>
			<button
				type="button"
				onClick={() => onLocaleChange?.("en")}
				aria-pressed={activeLocale === "en"}
				className={cn(
					"rounded px-2 py-1 text-xs font-medium",
					activeLocale === "en"
						? "bg-background text-foreground shadow"
						: "hover:bg-background/50",
				)}
			>
				EN
			</button>
		</div>
	);
}
