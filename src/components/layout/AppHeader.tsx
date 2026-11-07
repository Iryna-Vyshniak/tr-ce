
import { Link } from "react-router-dom";

import { LocaleSwitcher } from "../../features/localization/components/LocaleSwitcher";
import { useLocale } from "../../features/localization/hooks/useLocale";
import { MainNavigation } from "./MainNavigation";

export function AppHeader() {
  const { t } = useLocale();

  return (
    <header
      className={[
        "sticky top-0 z-50",
        "border-b border-border-subtle",
        "bg-background/90 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/75",
      ].join(" ")}
    >
      <div
        className={[
          "layout-container",
          "flex min-h-14 items-center gap-2",
          "sm:min-h-16 sm:gap-5",
        ].join(" ")}
      >
        <Link
          to="/"
          aria-label="TR//CE"
          className={[
            "shrink-0",
            "font-label text-[1.65rem]",
            "font-extrabold uppercase",
            "leading-none tracking-[-0.045em]",
            "text-foreground",
            "transition-opacity duration-200",
            "hover:opacity-85",
            "sm:text-3xl",
          ].join(" ")}
        >
          TR
          <span
            className="text-critical-hover"
            aria-hidden="true"
          >
            //
          </span>
          CE
        </Link>

        <MainNavigation />

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
              {t.system.label}
            </span>

            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-signal">
              <span
                className="size-1.5 rounded-full bg-signal shadow-[0_0_12px_rgb(255_214_0_/_45%)]"
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
