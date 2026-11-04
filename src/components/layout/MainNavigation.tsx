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

  return (
    <nav
      aria-label="Main navigation"
      className="min-w-0 flex-1 overflow-x-auto"
    >
      <ul className="flex min-w-max items-center gap-1">
        {navigationItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <li key={item.key}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex min-h-11 items-center px-3",
                  "font-mono text-xs font-medium uppercase tracking-[0.08em]",
                  "transition-colors duration-200",
                  isActive
                    ? "text-signal"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {t.navigation[item.key]}

                {isActive && (
                  <span
                    className="absolute inset-x-3 bottom-0 h-px bg-signal"
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
