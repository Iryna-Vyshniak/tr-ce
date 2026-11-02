import { activeCaseFile } from "../../cases/data/activeCase";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import type { CaseEvidence } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

const evidenceStatusStyles: Record<CaseEvidence["status"], string> = {
  verified: "border-signal/40 bg-signal/10 text-signal",
  lead: "border-evidence/40 bg-evidence/10 text-evidence",
};

export function CaseEvidence() {
  const { locale, t } = useLocale();
  const { progress } = useCaseProgress();

  const discoveredEvidence = activeCaseFile.evidence.filter((evidence) =>
    progress.discoveredEvidenceIds.includes(evidence.id),
  );

  const undiscoveredEvidenceCount =
    activeCaseFile.evidence.length - discoveredEvidence.length;

  const peopleById = new Map(
    activeCaseFile.people.map((person) => [person.id, person.name[locale]]),
  );

  const locationsById = new Map(
    activeCaseFile.locations.map((location) => [
      location.id,
      location.name[locale],
    ]),
  );

  return (
    <section aria-labelledby="case-evidence-title">
      <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.evidenceWorkspace.eyebrow}
          </p>

          <h2
            id="case-evidence-title"
            className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
          >
            {t.case.evidenceWorkspace.title}
          </h2>

          <p className="mt-5 text-base leading-7 text-foreground-secondary">
            {t.case.evidenceWorkspace.description}
          </p>
        </div>

        <dl className="flex shrink-0 gap-6 font-mono text-xs uppercase tracking-[0.1em]">
          <div>
            <dt className="text-muted-foreground">
              {t.case.evidenceWorkspace.discovered}
            </dt>

            <dd className="mt-2 text-lg font-semibold text-signal">
              {String(discoveredEvidence.length).padStart(2, "0")}
            </dd>
          </div>

          <div>
            <dt className="text-muted-foreground">
              {t.case.evidenceWorkspace.undiscovered}
            </dt>

            <dd className="mt-2 text-lg font-semibold text-muted-foreground">
              {String(undiscoveredEvidenceCount).padStart(2, "0")}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {discoveredEvidence.map((evidence) => {
          const relatedPeople = evidence.relatedPersonIds
            .map((personId) => peopleById.get(personId))
            .filter((name): name is string => name !== undefined);

          const locationName =
            locationsById.get(evidence.locationId) ?? evidence.locationId;

          return (
            <article
              key={evidence.id}
              className="border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-semibold tracking-[0.12em] text-muted-foreground">
                  {evidence.catalogNumber}
                </span>

                <span
                  className={[
                    "border px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em]",
                    evidenceStatusStyles[evidence.status],
                  ].join(" ")}
                >
                  {t.case.evidenceWorkspace.status[evidence.status]}
                </span>
              </div>

              <h3 className="mt-8 font-display text-3xl font-bold uppercase leading-none tracking-[-0.025em]">
                {evidence.title[locale]}
              </h3>

              <p className="mt-4 text-sm leading-6 text-foreground-secondary">
                {evidence.description[locale]}
              </p>

              <dl className="mt-6 grid gap-5 border-t border-border-subtle pt-5 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {t.case.evidenceWorkspace.foundAt}
                  </dt>

                  <dd className="mt-2 font-mono text-sm text-foreground">
                    {evidence.foundAt}
                  </dd>
                </div>

                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {t.case.evidenceWorkspace.location}
                  </dt>

                  <dd className="mt-2 text-sm text-foreground">
                    {locationName}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {t.case.evidenceWorkspace.relatedPeople}
                  </dt>

                  <dd className="mt-2 text-sm text-foreground">
                    {relatedPeople.join(", ")}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}