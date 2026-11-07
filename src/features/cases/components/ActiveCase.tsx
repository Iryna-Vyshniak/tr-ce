
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
  critical: "text-critical-hover",
} as const;

export function ActiveCase({ caseData }: ActiveCaseProps) {
  const { locale, t } = useLocale();

  const progress = Math.min(
    100,
    Math.max(0, caseData.progress),
  );

  return (
    <article
      id="active-case"
      aria-labelledby={`case-${caseData.id}-title`}
      className={[
        "trce-surface",
        "overflow-hidden",
      ].join(" ")}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)]">
        <div className="card-spacing">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-signal">
              {t.case.case} // {caseData.caseNumber}
            </span>

            <span
              className="size-1 bg-border"
              aria-hidden="true"
            />

            <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-evidence">
              {t.case[caseData.status]}
            </span>
          </div>

          <h2
            id={`case-${caseData.id}-title`}
            className="mt-4 font-display font-extrabold uppercase text-foreground"
          >
            {caseData.title[locale]}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
            {caseData.description[locale]}
          </p>

          <dl className="mt-6 grid gap-4 border-t border-border-subtle pt-5 sm:grid-cols-3 sm:gap-6">
            <div>
              <dt className="trce-data-label">
                {t.case.classification}
              </dt>

              <dd className="mt-2 text-sm text-foreground">
                {caseData.classification[locale]}
              </dd>
            </div>

            <div>
              <dt className="trce-data-label">
                {t.case.location}
              </dt>

              <dd className="mt-2 text-sm text-foreground">
                {caseData.location[locale]}
              </dd>
            </div>

            <div>
              <dt className="trce-data-label">
                {t.case.reportedTime}
              </dt>

              <dd className="mt-2 font-mono text-sm text-foreground">
                {caseData.occurredAt}
              </dd>
            </div>
          </dl>

          <div className="mt-6 sm:mt-8">
            <Link
              to={`/cases/${caseData.id}`}
              className="trce-button trce-button-primary"
            >
              {t.case.openCase}

              <span aria-hidden="true">
                //
              </span>
            </Link>
          </div>
        </div>

        <aside
          className={[
            "border-t border-border",
            "bg-background/20",
            "lg:border-l lg:border-t-0",
          ].join(" ")}
          aria-label={t.case.investigation}
        >
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

          <div className="card-spacing">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="trce-data-label">
                  {t.case.investigation}
                </p>

                <p
                  className="font-mono text-sm font-semibold text-signal"
                  aria-hidden="true"
                >
                  {progress}%
                </p>
              </div>

              <div
                className="trce-progress mt-3"
                role="progressbar"
                aria-label={t.case.investigation}
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

            <div className="mt-8">
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-evidence">
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
    <div className="min-w-0 border-r border-border p-3 last:border-r-0 sm:p-5">
      <dt className="trce-data-label break-words">
        {label}
      </dt>

      <dd
        className={[
          "mt-2 font-display",
          "text-[clamp(1.5rem,3vw,2.5rem)]",
          "font-bold leading-none",
          valueClassName,
        ].join(" ")}
      >
        {String(value).padStart(2, "0")}
      </dd>
    </div>
  );
}
