import { MainNavigation } from "./MainNavigation";


export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="shrink-0 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.04em]"
          aria-label="TR//CE home"
        >
          TR<span className="text-critical">//</span>CE
        </a>

        <MainNavigation />

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
            System
          </span>

          <span className="flex items-center gap-2 font-mono text-xs font-medium text-signal">
            <span
              className="size-1.5 rounded-full bg-signal"
              aria-hidden="true"
            />

            Online
          </span>
        </div>
      </div>
    </header>
  );
}