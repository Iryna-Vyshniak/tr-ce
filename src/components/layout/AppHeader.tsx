import { LocaleSwitcher } from "../../features/localization/components/LocaleSwitcher";
import { useLocale } from "../../features/localization/hooks/useLocale";
import { MainNavigation } from "./MainNavigation";

export function AppHeader() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <a
          href="/"
          className="shrink-0 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.04em]"
          aria-label="TR//CE"
        >
          TR<span className="text-critical">//</span>CE
        </a>

        <MainNavigation />

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
              {t.system.label}
            </span>

            <span className="flex items-center gap-2 font-mono text-xs font-medium text-signal">
              <span
                className="size-1.5 rounded-full bg-signal"
                aria-hidden="true"
              />

              {t.system.online}
            </span>
          </div>

          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}