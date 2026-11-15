import { activeCaseFile } from "../../cases/data/activeCase";
import { getCaseReportReadiness } from "../../cases/engine/caseReport.readiness";
import type { CaseAccusation } from "../../cases/engine/caseProgress.types";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import { useLocale } from "../../localization/hooks/useLocale";

export function CaseReport() {
  const { locale, t } = useLocale();
  const { progress, finalizeCaseReport } = useCaseProgress();
  const report = progress.caseReport;
  const accusation = report?.accusation ?? progress.accusation;
  const readiness = getCaseReportReadiness(progress, activeCaseFile);

  const peopleById = new Map(
    activeCaseFile.people.map((person) => [person.id, person.name[locale]]),
  );
  const evidenceById = new Map(
    activeCaseFile.evidence.map((evidence) => [evidence.id, evidence]),
  );
  const timelineById = new Map(
    activeCaseFile.timeline.map((event) => [event.id, event]),
  );

  const selectedEvidence = (accusation?.evidenceIds ?? [])
    .map((evidenceId) => evidenceById.get(evidenceId))
    .filter((evidence) => evidence !== undefined);
  const selectedTimeline = (accusation?.timelineEventIds ?? [])
    .map((eventId) => timelineById.get(eventId))
    .filter((event) => event !== undefined);
  const alternateNames = (accusation?.alternativeSuspectIds ?? [])
    .map((personId) => peopleById.get(personId))
    .filter((name): name is string => name !== undefined);
  const limitationNames = (accusation?.rejectedEvidenceIds ?? [])
    .map((evidenceId) => evidenceById.get(evidenceId)?.title[locale])
    .filter((title): title is string => title !== undefined);
  const suspectName = accusation?.suspectId
    ? peopleById.get(accusation.suspectId)
    : undefined;
  return (
    <section aria-labelledby="case-report-title">
      <div className="section-heading-spacing border-b border-border">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.reportWorkspace.eyebrow}
        </p>

        <h2
          id="case-report-title"
          className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
        >
          {t.case.reportWorkspace.title}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
          {t.case.reportWorkspace.description}
        </p>
      </div>

      {report ? (
        <div className="section-content-spacing content-gap">
          <section className="card-spacing border border-signal/60 bg-signal/10">
            <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-signal">
              {t.case.reportWorkspace.reportLocked}
            </p>

          </section>

          <CaseReportContents
            accusation={accusation}
            suspectName={suspectName}
            alternateNames={alternateNames}
            limitationNames={limitationNames}
            selectedTimeline={selectedTimeline}
            selectedEvidence={selectedEvidence}
          />
        </div>
      ) : (
        <div className="section-content-spacing content-gap grid xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="card-spacing border border-border bg-surface">
            <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
              {t.case.reportWorkspace.readiness}
            </p>

            <p
              className={[
                "mt-4 border-l-2 px-4 py-3 text-sm leading-6",
                readiness.isReady
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-evidence bg-evidence/10 text-evidence",
              ].join(" ")}
              role="status"
            >
              {readiness.isReady
                ? t.case.reportWorkspace.complete
                : t.case.reportWorkspace.incomplete}
            </p>

            <ul className="mt-6 grid gap-3">
              {readiness.requirements.map((requirement) => (
                <li
                  key={requirement.id}
                  className="flex items-start gap-3 border border-border-subtle bg-background p-4 text-sm leading-6"
                >
                  <span
                    className={
                      requirement.satisfied ? "text-signal" : "text-muted-foreground"
                    }
                    aria-hidden="true"
                  >
                    {requirement.satisfied ? "✓" : "○"}
                  </span>
                  <span>{t.case.reportWorkspace.requirements[requirement.id]}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="card-spacing border border-border bg-surface">
            <p className="text-sm leading-6 text-foreground-secondary">
              {t.case.reportWorkspace.finalizationNote}
            </p>

            <button
              type="button"
              onClick={finalizeCaseReport}
              disabled={!readiness.isReady}
              className="mt-6 flex min-h-11 w-full items-center justify-center bg-signal px-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-200 hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.case.reportWorkspace.finalize}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

interface ReportDetailProps {
  label: string;
  value: string;
}

function ReportDetail({ label, value }: ReportDetailProps) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 break-all font-mono text-xs text-foreground">{value}</dd>
    </div>
  );
}

interface CaseReportContentsProps {
  accusation: CaseAccusation | undefined;
  suspectName: string | undefined;
  alternateNames: string[];
  limitationNames: string[];
  selectedTimeline: (typeof activeCaseFile.timeline)[number][];
  selectedEvidence: (typeof activeCaseFile.evidence)[number][];
}

function CaseReportContents({
  accusation,
  suspectName,
  alternateNames,
  limitationNames,
  selectedTimeline,
  selectedEvidence,
}: CaseReportContentsProps) {
  const { locale, t } = useLocale();

  return (
    <div className="content-gap grid">
      <section className="card-spacing border border-border bg-surface">
        <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.reportWorkspace.primaryConclusion}
        </p>

        <p className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em]">
          {suspectName ?? t.case.reportWorkspace.noAlternatives}
        </p>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-foreground-secondary">
          {accusation?.rationale || t.case.reportWorkspace.noAlternatives}
        </p>

        <dl className="mt-6 grid gap-5 border-t border-border-subtle pt-5 sm:grid-cols-2">
          <ReportDetail
            label={t.case.reportWorkspace.alternatives}
            value={alternateNames.join(", ") || t.case.reportWorkspace.noAlternatives}
          />
          <ReportDetail
            label={t.case.reportWorkspace.limitations}
            value={limitationNames.join(", ") || t.case.reportWorkspace.noAlternatives}
          />
        </dl>
      </section>

      <section className="card-spacing border border-border bg-surface">
        <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.reportWorkspace.evidenceGraph}
        </p>

        {selectedEvidence.length > 0 ? (
          <ol className="mt-6 grid gap-4">
            {selectedEvidence.map((evidence) => (
              <li
                key={evidence.id}
                className="border border-border-subtle bg-background p-5"
              >
                <div className="grid gap-4 lg:grid-cols-4">
                  <GraphStep
                    label={t.case.reportWorkspace.source}
                    value={`${evidence.catalogNumber} · ${evidence.foundAt}`}
                  />
                  <GraphStep
                    label={t.case.reportWorkspace.observation}
                    value={evidence.description[locale]}
                  />
                  <GraphStep
                    label={t.case.reportWorkspace.inference}
                    value={accusation?.rationale || t.case.reportWorkspace.noAlternatives}
                  />
                  <GraphStep
                    label={t.case.reportWorkspace.conclusion}
                    value={suspectName ?? t.case.reportWorkspace.noAlternatives}
                  />
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            {t.case.reportWorkspace.noEvidence}
          </p>
        )}
      </section>

      {selectedTimeline.length > 0 && (
        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.theoryWorkspace.timeline}
          </p>

          <ol className="mt-5 grid gap-3">
            {selectedTimeline.map((event) => (
              <li
                key={event.id}
                className="border-l-2 border-signal bg-background px-4 py-3 text-sm leading-6"
              >
                <span className="font-mono text-xs font-semibold text-signal">
                  {event.occurredAt}
                </span>
                <span className="ml-3 text-foreground">{event.title[locale]}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <p className="border-l-2 border-evidence bg-evidence/10 px-4 py-3 text-sm leading-6 text-evidence">
        {t.case.reportWorkspace.reviewReminder}
      </p>
    </div>
  );
}

interface GraphStepProps {
  label: string;
  value: string;
}

function GraphStep({ label, value }: GraphStepProps) {
  return (
    <div>
      <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground-secondary">{value}</p>
    </div>
  );
}
