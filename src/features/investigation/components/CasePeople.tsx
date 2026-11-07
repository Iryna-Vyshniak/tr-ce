
import { activeCaseFile } from "../../cases/data/activeCase";
import type { CasePerson } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

const roleStyles: Record<CasePerson["role"], string> = {
  victim:
    "border-critical/50 bg-critical/10 text-critical-hover",
  suspect:
    "border-evidence/50 bg-evidence/10 text-evidence",
  witness:
    "border-signal/50 bg-signal/10 text-signal",
  "person-of-interest":
    "border-border bg-surface-elevated text-foreground-secondary",
};

export function CasePeople() {
  const { locale, t } = useLocale();

  return (
    <section aria-labelledby="case-people-title">
      <div className="section-heading-spacing border-b border-border">
        <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.peopleWorkspace.eyebrow}
        </p>

        <h2
          id="case-people-title"
          className="mt-3 font-display font-bold uppercase text-foreground"
        >
          {t.case.peopleWorkspace.title}
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
          {t.case.peopleWorkspace.description}
        </p>
      </div>

      <div className="section-content-spacing content-gap grid xl:grid-cols-2">
        {activeCaseFile.people.map((person) => {
          const statements = activeCaseFile.statements.filter(
            (statement) => statement.speakerId === person.id,
          );

          return (
            <article
              key={person.id}
              className="trce-card min-w-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="trce-data-label">
                    {person.occupation[locale]}
                  </p>

                  <h3 className="mt-3 font-display font-bold uppercase text-foreground">
                    {person.name[locale]}
                  </h3>
                </div>

                <span
                  className={[
                    "trce-status shrink-0",
                    roleStyles[person.role],
                  ].join(" ")}
                >
                  {t.case.peopleWorkspace.roles[person.role]}
                </span>
              </div>

              <dl className="mt-5 border-y border-border-subtle py-4">
                <div>
                  <dt className="trce-data-label">
                    {t.case.peopleWorkspace.connection}
                  </dt>

                  <dd className="mt-2 text-sm leading-6 text-foreground">
                    {person.connection[locale]}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-sm leading-6 text-foreground-secondary">
                {person.profile[locale]}
              </p>

              <div className="mt-5 border-t border-border-subtle pt-4">
                <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-evidence">
                  {t.case.peopleWorkspace.statements}
                </p>

                {statements.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {statements.map((statement) => (
                      <blockquote
                        key={statement.id}
                        className="trce-dialogue trce-dialogue-character"
                      >
                        <p className="text-sm leading-6 text-foreground-secondary">
                          {statement.text[locale]}
                        </p>

                        <footer className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-muted-foreground">
                          <span>
                            {t.case.peopleWorkspace.claimedTime}:{" "}
                            {statement.claimedTime}
                          </span>

                          <span>
                            {t.case.peopleWorkspace.recordedAt}:{" "}
                            {statement.recordedAt}
                          </span>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {t.case.peopleWorkspace.noStatements}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
