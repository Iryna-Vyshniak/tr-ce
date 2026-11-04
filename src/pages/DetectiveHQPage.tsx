import { ActiveCase } from "../features/cases/components/ActiveCase";
import { activeCase } from "../features/cases/data/activeCase";
import { useLocale } from "../features/localization/hooks/useLocale";

export function DetectiveHQPage() {
  const { t } = useLocale();

  return (
    <>
      <section
        id="hq"
        aria-labelledby="hq-title"
        className="layout-container section-spacing"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-signal">
            {t.hq.eyebrow}
          </p>

          <h1
            id="hq-title"
            className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] sm:text-7xl lg:text-8xl"
          >
            {t.hq.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-secondary sm:text-lg">
            {t.hq.description}
          </p>
        </div>

        <dl className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border-subtle pt-6 font-mono text-xs uppercase tracking-[0.1em]">
          <div className="flex items-baseline gap-2">
            <dt className="text-muted-foreground">
              {t.hq.activeCases}
            </dt>

            <dd className="font-medium text-foreground">
              01
            </dd>
          </div>

          <div className="flex items-baseline gap-2">
            <dt className="text-muted-foreground">
              {t.hq.evidence}
            </dt>

            <dd className="font-medium text-evidence">
              {String(activeCase.evidenceCount).padStart(2, "0")}
            </dd>
          </div>

          <div className="flex items-baseline gap-2">
            <dt className="text-muted-foreground">
              {t.hq.contradictions}
            </dt>

            <dd className="font-medium text-critical">
              {String(activeCase.contradictionCount).padStart(2, "0")}
            </dd>
          </div>
        </dl>
      </section>

      <div className="layout-container section-spacing-end">
        <ActiveCase caseData={activeCase} />
      </div>
    </>
  );
}
