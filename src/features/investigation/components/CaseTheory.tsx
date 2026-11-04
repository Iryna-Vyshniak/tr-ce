import type { CaseAccusation } from "../../cases/engine/caseProgress.types";
import { activeCaseFile } from "../../cases/data/activeCase";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import { useLocale } from "../../localization/hooks/useLocale";

const emptyAccusation: CaseAccusation = {
  suspectId: "",
  motiveFactIds: [],
  timelineEventIds: [],
  evidenceIds: [],
  rejectedEvidenceIds: [],
  rationale: "",
};

function toggleId(ids: string[], id: string) {
  return ids.includes(id)
    ? ids.filter((currentId) => currentId !== id)
    : [...ids, id];
}

export function CaseTheory() {
  const { locale, t } = useLocale();
  const { progress, setProgress } = useCaseProgress();

  const draft = progress.accusation ?? emptyAccusation;

  const suspects = activeCaseFile.people.filter(
    (person) => person.role === "suspect",
  );

  const discoveredEvidence = activeCaseFile.evidence.filter((evidence) =>
    progress.discoveredEvidenceIds.includes(evidence.id),
  );

  const visibleTimelineEvents = activeCaseFile.timeline.filter((event) =>
    event.relatedEvidenceIds.every((evidenceId) =>
      progress.discoveredEvidenceIds.includes(evidenceId),
    ),
  );

  function updateDraft(update: Partial<CaseAccusation>) {
    setProgress((currentProgress) => ({
      ...currentProgress,
      phase: "theory",
      accusation: {
        ...(currentProgress.accusation ?? emptyAccusation),
        ...update,
      },
    }));
  }

  function toggleSupportingEvidence(evidenceId: string) {
    updateDraft({
      evidenceIds: toggleId(draft.evidenceIds, evidenceId),
      rejectedEvidenceIds: draft.rejectedEvidenceIds.filter(
        (currentId) => currentId !== evidenceId,
      ),
    });
  }

  function toggleRejectedEvidence(evidenceId: string) {
    updateDraft({
      rejectedEvidenceIds: toggleId(draft.rejectedEvidenceIds, evidenceId),
      evidenceIds: draft.evidenceIds.filter(
        (currentId) => currentId !== evidenceId,
      ),
    });
  }

  return (
    <section aria-labelledby="case-theory-title">
      <div className="section-heading-spacing border-b border-border">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.theoryWorkspace.eyebrow}
        </p>

        <h2
          id="case-theory-title"
          className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
        >
          {t.case.theoryWorkspace.title}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
          {t.case.theoryWorkspace.description}
        </p>

        <p
          className="mt-5 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm leading-6 text-signal"
          role="status"
        >
          {t.case.theoryWorkspace.autosave}
        </p>
      </div>

      <div className="section-content-spacing content-gap grid xl:grid-cols-2">
        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            01 // {t.case.theoryWorkspace.suspect}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {suspects.map((person) => {
              const isSelected = draft.suspectId === person.id;

              return (
                <button
                  key={person.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => updateDraft({ suspectId: person.id })}
                  className={[
                    "border p-4 text-left transition-colors duration-200",
                    isSelected
                      ? "border-signal bg-signal/10"
                      : "border-border-subtle bg-background hover:border-muted-foreground",
                  ].join(" ")}
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {person.occupation[locale]}
                  </span>

                  <span className="mt-2 block font-display text-3xl font-bold uppercase leading-none tracking-[-0.025em]">
                    {person.name[locale]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            02 // {t.case.theoryWorkspace.motive}
          </p>

          <div className="mt-5 space-y-3">
            {activeCaseFile.theoryMotiveOptions.map((motive) => {
              const isSelected = draft.motiveFactIds.includes(motive.id);

              return (
                <button
                  key={motive.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    updateDraft({
                      motiveFactIds: isSelected ? [] : [motive.id],
                    })
                  }
                  className={[
                    "w-full border p-4 text-left transition-colors duration-200",
                    isSelected
                      ? "border-signal bg-signal/10"
                      : "border-border-subtle bg-background hover:border-muted-foreground",
                  ].join(" ")}
                >
                  <span className="font-display text-2xl font-bold uppercase leading-none tracking-[-0.02em]">
                    {motive.title[locale]}
                  </span>

                  <span className="mt-3 block text-sm leading-6 text-foreground-secondary">
                    {motive.description[locale]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            03 // {t.case.theoryWorkspace.supportingEvidence}
          </p>

          <div className="mt-5 space-y-3">
            {discoveredEvidence.map((evidence) => {
              const isSelected = draft.evidenceIds.includes(evidence.id);

              return (
                <label
                  key={evidence.id}
                  className="flex cursor-pointer gap-3 border border-border-subtle bg-background p-4 text-sm leading-6 transition-colors hover:border-muted-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSupportingEvidence(evidence.id)}
                    className="mt-1 size-4 accent-signal"
                  />

                  <span>
                    <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground">
                      {evidence.catalogNumber}
                    </span>

                    <span className="ml-3 text-foreground">
                      {evidence.title[locale]}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            04 // {t.case.theoryWorkspace.timeline}
          </p>

          <div className="mt-5 space-y-3">
            {visibleTimelineEvents.map((event) => {
              const isSelected = draft.timelineEventIds.includes(event.id);

              return (
                <label
                  key={event.id}
                  className="flex cursor-pointer gap-3 border border-border-subtle bg-background p-4 text-sm leading-6 transition-colors hover:border-muted-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                      updateDraft({
                        timelineEventIds: toggleId(
                          draft.timelineEventIds,
                          event.id,
                        ),
                      })
                    }
                    className="mt-1 size-4 accent-signal"
                  />

                  <span>
                    <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground">
                      {event.occurredAt}
                    </span>

                    <span className="ml-3 text-foreground">
                      {event.title[locale]}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            05 // {t.case.theoryWorkspace.rejectedEvidence}
          </p>

          <div className="mt-5 space-y-3">
            {discoveredEvidence.map((evidence) => {
              const isSelected = draft.rejectedEvidenceIds.includes(evidence.id);

              return (
                <label
                  key={evidence.id}
                  className="flex cursor-pointer gap-3 border border-border-subtle bg-background p-4 text-sm leading-6 transition-colors hover:border-muted-foreground"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRejectedEvidence(evidence.id)}
                    className="mt-1 size-4 accent-evidence"
                  />

                  <span>
                    <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-muted-foreground">
                      {evidence.catalogNumber}
                    </span>

                    <span className="ml-3 text-foreground">
                      {evidence.title[locale]}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="card-spacing border border-border bg-surface">
          <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
            06 // {t.case.theoryWorkspace.rationale}
          </p>

          <textarea
            value={draft.rationale}
            onChange={(event) =>
              updateDraft({ rationale: event.target.value })
            }
            placeholder={t.case.theoryWorkspace.rationalePlaceholder}
            className="mt-5 min-h-52 w-full resize-y border border-border-subtle bg-background p-4 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-signal"
          />
        </section>
      </div>
    </section>
  );
}
