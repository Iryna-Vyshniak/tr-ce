import { Link, NavLink } from "react-router-dom";

import type { CaseSummary } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

interface CaseWorkspaceHeaderProps {
  caseData: CaseSummary;
}

const workspaceNavigation = [
  {
    key: "overview",
    path: "",
    end: true,
  },
  {
    key: "evidence",
    path: "evidence",
    end: false,
  },
  {
    key: "people",
    path: "people",
    end: false,
  },
  {
    key: "timeline",
    path: "timeline",
    end: false,
  },
  {
    key: "board",
    path: "board",
    end: false,
  },
] as const;

export function CaseWorkspaceHeader({
  caseData,
}: CaseWorkspaceHeaderProps) {
  const { locale, t } = useLocale();

  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-[100rem] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex min-h-11 items-center font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:text-signal"
        >
          <span
            className="mr-2 text-signal"
            aria-hidden="true"
          >
            ←
          </span>

          {t.case.workspace.backToHQ}
        </Link>

        {/* Case identity */}
        <div className="mt-5 flex flex-col gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal">
                {t.case.case} // {caseData.caseNumber}
              </p>

              <span
                className="size-1 shrink-0 bg-border"
                aria-hidden="true"
              />

              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-evidence">
                {t.case[caseData.status]}
              </p>
            </div>

            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.88] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {caseData.title[locale]}
            </h1>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              {caseData.location[locale]}
            </p>
          </div>

          {/* Case progress */}
          <div className="w-full max-w-xs shrink-0">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {t.case.workspace.progress}
              </span>

              <span
                className="font-mono text-xs font-semibold text-signal"
                aria-hidden="true"
              >
                {caseData.progress}%
              </span>
            </div>

            <div
              className="mt-3 h-1 overflow-hidden bg-border-subtle"
              role="progressbar"
              aria-label={t.case.workspace.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={caseData.progress}
              aria-valuetext={`${caseData.progress}%`}
            >
              <div
                className="h-full bg-signal transition-[width] duration-300"
                style={{
                  width: `${caseData.progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Investigation navigation */}
        <nav
          aria-label={t.case.investigation}
          className="overflow-x-auto"
        >
          <ul className="flex min-w-max">
            {workspaceNavigation.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "relative flex min-h-12 items-center px-4",
                      "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
                      "transition-colors duration-200",
                      isActive
                        ? "text-signal"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t.case.workspace[item.key]}

                      {isActive && (
                        <span
                          className="absolute inset-x-4 bottom-0 h-px bg-signal"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}