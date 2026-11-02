import { activeCase } from "../../cases/data/activeCase";
import { useLocale } from "../../localization/hooks/useLocale";

export function CaseOverview() {
  const { locale, t } = useLocale();

  return (
    <section aria-labelledby="case-overview-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.workspace.overview}
          </p>

          <h2
            id="case-overview-title"
            className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
          >
            {activeCase.classification[locale]}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-7 text-foreground-secondary">
            {activeCase.description[locale]}
          </p>
        </div>

        <aside className="border-l-2 border-evidence pl-5">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.latestTrace}
          </p>

          <blockquote className="mt-4 text-sm leading-6 text-foreground-secondary">
            {activeCase.lastTrace[locale]}
          </blockquote>
        </aside>
      </div>
    </section>
  );
}