import type { Locale } from "../localization.types";
import { useLocale } from "../hooks/useLocale";

const localeOptions = [
  {
    value: "uk",
    label: "УКР",
    ariaLabel: "Українська",
  },
  {
    value: "en",
    label: "EN",
    ariaLabel: "English",
  },
] satisfies ReadonlyArray<{
  value: Locale;
  label: string;
  ariaLabel: string;
}>;

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center border border-border-subtle"
      role="group"
      aria-label="Language"
    >
      {localeOptions.map((option) => {
        const isActive = locale === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-label={option.ariaLabel}
            aria-pressed={isActive}
            className={[
              "min-h-11 min-w-11 px-3",
              "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
              "transition-colors duration-200",
              "focus-visible:relative focus-visible:z-10",
              isActive
                ? "bg-signal text-background"
                : "bg-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}