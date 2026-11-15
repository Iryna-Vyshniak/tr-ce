
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLocale } from "../../features/localization/hooks/useLocale";

const navigationItems = [
  {
    key: "hq",
    hash: "#hq",
  },
  {
    key: "cases",
    hash: "#active-case",
  },
] as const;

export function MainNavigation() {
  const { t } = useLocale();
  const location = useLocation();

  const activeHash =
    location.pathname === "/" ? location.hash || "#hq" : undefined;

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <nav
      aria-label={t.navigation.ariaLabel}
      className={[
        "min-w-0 flex-1",
        "overflow-x-auto",
        "[scrollbar-width:none]",
        "[&::-webkit-scrollbar]:hidden",
      ].join(" ")}
    >
      <ul className="flex min-w-max items-center gap-0.5 sm:gap-1">
        {navigationItems.map((item) => {
          const isActive = activeHash === item.hash;

          return (
            <li key={item.key}>
              <Link
                to={{ pathname: "/", hash: item.hash }}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
