
import { Link, NavLink } from "react-router-dom";

import type { CaseSummary } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

interface CaseWorkspaceHeaderProps {
  caseData: CaseSummary;
}

const workspaceNavigation = [
  { key: "overview", path: "", end: true },
  { key: "evidence", path: "evidence", end: false },
  { key: "scene", path: "scene", end: false },
  { key: "people", path: "people", end: false },
  { key: "interrogation", path: "interrogation", end: false },
  { key: "timeline", path: "timeline", end: false },
  { key: "board", path: "board", end: false },
  { key: "theory", path: "theory", end: false },
] as const;

export function CaseWorkspaceHeader({
  caseData,
}: CaseWorkspaceHeaderProps) {
  const { locale, t } = useLocale();

  const progress = Math.min(
    100,
    Math.max(0, caseData.progress),
  );

  return (
    <header className="border-b border-border bg-background/30">
      <div className="layout-container workspace-header-spacing">
        <Link
          to="/"
          className={[
            "inline-flex min-h-11 items-center gap-2",
            "font-mono text-[0.6875rem]",
            "font-semibold uppercase tracking-[0.1em]",
            "text-muted-foreground",
            "transition-colors duration-200",
            "hover:text-signal",
          ].join(" ")}
        >
          <span
            className="text-signal"
            aria-hidden="true"
          >
            ←
          </span>

          {t.case.workspace.backToHQ}
        </Link>

        <div className="mt-4 flex flex-col gap-5 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-signal">
                {t.case.case} // {caseData.caseNumber}
              </p>

              <span
                className="size-1 bg-border"
                aria-hidden="true"
              />

              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-evidence">
                {t.case[caseData.status]}
              </p>
            </div>

            <h1 className="mt-3 font-display font-extrabold uppercase text-foreground">
              {caseData.title[locale]}
            </h1>

            <p className="mt-3 font-mono text-[0.6875rem] uppercase leading-5 tracking-[0.06em] text-muted-foreground">
              {caseData.location[locale]}
            </p>
          </div>

          <div className="w-full max-w-xs shrink-0">
            <div className="flex items-center justify-between gap-4">
              <span className="trce-data-label">
                {t.case.workspace.progress}
              </span>

              <span
                className="font-mono text-sm font-semibold text-signal"
                aria-hidden="true"
              >
                {progress}%
              </span>
            </div>

            <div
              className="trce-progress mt-3"
              role="progressbar"
              aria-label={t.case.workspace.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-valuetext={`${progress}%`}
            >
              <div
                className="trce-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <nav
          aria-label={t.case.investigation}
          className={[
            "overflow-x-auto",
            "[scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
          ].join(" ")}
        >
          <ul className="flex min-w-max items-center">
            {workspaceNavigation.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "relative inline-flex min-h-12",
                      "items-center px-3 sm:px-4",
                      "font-mono text-[0.6875rem]",
                      "font-semibold uppercase",
                      "tracking-[0.08em]",
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
                          className={[
                            "pointer-events-none",
                            "absolute inset-x-3 bottom-0",
                            "h-0.5",
                            "bg-[image:var(--gradient-signal)]",
                            "sm:inset-x-4",
                          ].join(" ")}
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
3