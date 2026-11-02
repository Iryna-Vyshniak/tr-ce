import { MotionConfig, motion } from "motion/react";

import { activeCaseFile } from "../../cases/data/activeCase";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import type { TimelineEvent } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

const timelineStatusStyles: Record<TimelineEvent["status"], string> = {
  confirmed: "border-signal/40 bg-signal/10 text-signal",
  disputed: "border-critical/40 bg-critical/10 text-critical",
  inferred: "border-evidence/40 bg-evidence/10 text-evidence",
};

export function CaseTimeline() {
  const { locale, t } = useLocale();
  const { progress } = useCaseProgress();

  const discoveredEvidenceIds = new Set(progress.discoveredEvidenceIds);

  const visibleEvents = activeCaseFile.timeline.filter((event) =>
    event.relatedEvidenceIds.every((evidenceId) =>
      discoveredEvidenceIds.has(evidenceId),
    ),
  );

  const hiddenEventCount = activeCaseFile.timeline.length - visibleEvents.length;

  const evidenceById = new Map(
    activeCaseFile.evidence.map((evidence) => [
      evidence.id,
      evidence.title[locale],
    ]),
  );

  const peopleById = new Map(
    activeCaseFile.people.map((person) => [person.id, person.name[locale]]),
  );

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="case-timeline-title">
      <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.timelineWorkspace.eyebrow}
          </p>

          <h2
            id="case-timeline-title"
            className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
          >
            {t.case.timelineWorkspace.title}
          </h2>

          <p className="mt-5 text-base leading-7 text-foreground-secondary">
            {t.case.timelineWorkspace.description}
          </p>
        </div>

        <dl className="flex shrink-0 gap-6 font-mono text-xs uppercase tracking-[0.1em]">
          <div>
            <dt className="text-muted-foreground">
              {t.case.timelineWorkspace.reconstructed}
            </dt>

            <dd className="mt-2 text-lg font-semibold text-signal">
              {String(visibleEvents.length).padStart(2, "0")}
            </dd>
          </div>

          <div>
            <dt className="text-muted-foreground">
              {t.case.timelineWorkspace.hidden}
            </dt>

            <dd className="mt-2 text-lg font-semibold text-muted-foreground">
              {String(hiddenEventCount).padStart(2, "0")}
            </dd>
          </div>
        </dl>
      </div>

      <ol className="mt-8 border-l border-border">
        {visibleEvents.map((event, index) => {
          const evidenceTitles = event.relatedEvidenceIds
            .map((evidenceId) => evidenceById.get(evidenceId))
            .filter((title): title is string => title !== undefined);

          const peopleNames = event.relatedPersonIds
            .map((personId) => peopleById.get(personId))
            .filter((name): name is string => name !== undefined);

          return (
            <motion.li
              key={event.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              className="relative pb-6 pl-7 last:pb-0 sm:pl-9"
            >
              <span
                className="absolute -left-1 top-1.5 size-2 border border-signal bg-background"
                aria-hidden="true"
              />

              <motion.article
                layout
                className="border border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <time className="font-mono text-lg font-semibold text-signal">
                      {event.occurredAt}
                    </time>

                    <span
                      className={[
                        "border px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em]",
                        timelineStatusStyles[event.status],
                      ].join(" ")}
                    >
                      {t.case.timelineWorkspace.status[event.status]}
                    </span>
                  </div>
                </div>

                <h3 className="mt-6 font-display text-3xl font-bold uppercase leading-none tracking-[-0.025em]">
                  {event.title[locale]}
                </h3>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-foreground-secondary">
                  {event.description[locale]}
                </p>

                <dl className="mt-6 grid gap-5 border-t border-border-subtle pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {t.case.timelineWorkspace.relatedPeople}
                    </dt>

                    <dd className="mt-2 text-sm text-foreground">
                      {peopleNames.join(", ")}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {t.case.timelineWorkspace.relatedEvidence}
                    </dt>

                    <dd className="mt-2 text-sm text-foreground">
                      {evidenceTitles.length > 0
                        ? evidenceTitles.join(", ")
                        : t.case.timelineWorkspace.noEvidence}
                    </dd>
                  </div>
                </dl>
              </motion.article>
            </motion.li>
          );
        })}
      </ol>
      </section>
    </MotionConfig>
  );
}
