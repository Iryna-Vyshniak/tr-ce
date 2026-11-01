const navigationItems = [
  {
    label: "HQ",
    href: "#hq",
  },
  {
    label: "Cases",
    href: "#cases",
  },
  {
    label: "Archive",
    href: "#archive",
  },
] as const;

export function MainNavigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <li key={item.label}>
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
                {item.label}

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