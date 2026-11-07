
import { useLocation } from "react-router-dom";

import { useLocale } from "../../features/localization/hooks/useLocale";

const navigationItems = [
  {
    key: "hq",
    href: "#hq",
  },
  {
    key: "cases",
    href: "#cases",
  },
  {
    key: "archive",
    href: "#archive",
  },
] as const;

export function MainNavigation() {
  const { t } = useLocale();
  const location = useLocation();

  const activeHash = location.hash || "#hq";

  return (
    <nav
      aria-label="Main navigation"
      className={[
        "min-w-0 flex-1",
        "overflow-x-auto",
        "[scrollbar-width:none]",
        "[&::-webkit-scrollbar]:hidden",
      ].join(" ")}
    >
      <ul className="flex min-w-max items-center gap-0.5 sm:gap-1">
        {navigationItems.map((item) => {
          const isActive =
            location.pathname === "/" &&
            activeHash === item.href;

          return (
            <li key={item.key}>
              <a
                href={`/${item.href}`}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "trce-nav-link",
                  "relative min-h-11",
                  "px-2 text-[0.625rem]",
                  "tracking-[0.04em]",
                  "sm:px-3 sm:text-xs",
                  isActive
                    ? "text-signal"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {t.navigation[item.key]}

                {isActive && (
                  <span
                    className={[
                      "pointer-events-none",
                      "absolute inset-x-2 bottom-0",
                      "h-0.5",
                      "bg-[image:var(--gradient-signal)]",
                      "sm:inset-x-3",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
6