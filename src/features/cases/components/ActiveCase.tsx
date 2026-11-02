import { Link } from "react-router-dom";

import { useLocale } from "../../localization/hooks/useLocale";
import type { CaseSummary } from "../types/case.types";

interface ActiveCaseProps {
  caseData: CaseSummary;
}

interface CaseMetricProps {
  label: string;
  value: number;
  variant?: "default" | "evidence" | "critical";
}

const metricValueStyles = {
  default: "text-foreground",
  evidence: "text-evidence",
  critical: "text-critical",
} as const;

export function ActiveCase({ caseData }: ActiveCaseProps) {
  const { locale, t } = useLocale();

  return (
    <article
      id="active-case"
      aria-labelledby={`case-${caseData.id}-title`}
      className="border-y border-border"
    >
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)]">
        {/* Case overview */}
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Case status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal">
              {t.case.case} // {caseData.caseNumber}
            </span>

            <span
              className="size-1 bg-border"
              aria-hidden="true"
            />

            <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-evidence">
              {t.case[caseData.status]}
            </span>
          </div>

          {/* Case title */}
          <h2
            id={`case-${caseData.id}-title`}
            className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          >
            {caseData.title[locale]}
          </h2>

          {/* Case description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-secondary">
            {caseData.description[locale]}
          </p>

          {/* Case metadata */}
          <dl className="mt-8 grid max-w-2xl gap-x-8 gap-y-5 border-t border-border-subtle pt-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {t.case.classification}
              </dt>

              <dd className="mt-2 text-sm text-foreground">
                {caseData.classification[locale]}
              </dd>
            </div>

            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {t.case.location}
              </dt>

              <dd className="mt-2 text-sm text-foreground">
                {caseData.location[locale]}
              </dd>
            </div>

            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {t.case.reportedTime}
              </dt>

              <dd className="mt-2 font-mono text-sm text-foreground">
                {caseData.occurredAt}
              </dd>
            </div>
          </dl>

          {/* Primary navigation */}
          <div className="mt-9">
            <Link
              to={`/cases/${caseData.id}`}
              className="inline-flex min-h-11 items-center justify-center bg-signal px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-200 hover:bg-signal-hover"
            >
              {t.case.openCase}

              <span
                className="ml-3"
                aria-hidden="true"
              >
                //
              </span>
            </Link>
          </div>
        </div>

        {/* Investigation summary */}
        <aside
          className="border-t border-border lg:border-l lg:border-t-0"
          aria-label={t.case.investigation}
        >
          {/* Case metrics */}
          <dl className="grid grid-cols-3 border-b border-border">
            <CaseMetric
              label={t.case.evidence}
              value={caseData.evidenceCount}
              variant="evidence"
            />

            <CaseMetric
              label={t.case.suspects}
              value={caseData.suspectCount}
            />

            <CaseMetric
              label={t.case.conflicts}
              value={caseData.contradictionCount}
              variant="critical"
            />
          </dl>

          <div className="p-6 sm:p-8">
            {/* Investigation progress */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {t.case.investigation}
                </p>

                <p
                  className="font-mono text-xs font-medium text-signal"
                  aria-hidden="true"
                >
                  {caseData.progress}%
                </p>
              </div>

              <div
                className="mt-3 h-1 overflow-hidden bg-border-subtle"
                role="progressbar"
                aria-label={t.case.investigation}
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

            {/* Latest trace */}
            <div className="mt-10">
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-evidence">
                {t.case.latestTrace}
              </p>

              <blockquote className="mt-4 border-l-2 border-evidence pl-4 text-sm leading-6 text-foreground-secondary">
                {caseData.lastTrace[locale]}
              </blockquote>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function CaseMetric({
  label,
  value,
  variant = "default",
}: CaseMetricProps) {
  const valueClassName = metricValueStyles[variant];

  return (
    <div className="border-r border-border p-4 last:border-r-0 sm:p-6">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>

      <dd
        className={`mt-2 font-display text-4xl font-bold leading-none ${valueClassName}`}
      >
        {String(value).padStart(2, "0")}
      </dd>
    </div>
  );
}5