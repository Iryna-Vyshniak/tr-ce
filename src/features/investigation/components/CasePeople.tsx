import { activeCaseFile } from "../../cases/data/activeCase";
import type { CasePerson } from "../../cases/types/case.types";
import { useLocale } from "../../localization/hooks/useLocale";

const roleStyles: Record<CasePerson["role"], string> = {
  victim: "border-critical/40 bg-critical/10 text-critical",
  suspect: "border-evidence/40 bg-evidence/10 text-evidence",
  witness: "border-signal/40 bg-signal/10 text-signal",
  "person-of-interest": "border-border bg-surface-elevated text-foreground-secondary",
};

export function CasePeople() {
  const { locale, t } = useLocale();

  return (
    <section aria-labelledby="case-people-title">
      <div className="border-b border-border pb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
          {t.case.peopleWorkspace.eyebrow}
        </p>

        <h2
          id="case-people-title"
          className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
        >
          {t.case.peopleWorkspace.title}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
          {t.case.peopleWorkspace.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {activeCaseFile.people.map((person) => {
          const statements = activeCaseFile.statements.filter(
            (statement) => statement.speakerId === person.id,
          );

          return (
            <article
              key={person.id}
              className="border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {person.occupation[locale]}
                  </p>

                  <h3 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em]">
                    {person.name[locale]}
                  </h3>
                </div>

                <span
                  className={[
                    "border px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em]",
                    roleStyles[person.role],
                  ].join(" ")}
                >
                  {t.case.peopleWorkspace.roles[person.role]}
                </span>
              </div>

              <dl className="mt-7 border-y border-border-subtle py-5">
                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {t.case.peopleWorkspace.connection}
                  </dt>

                  <dd className="mt-2 text-sm leading-6 text-foreground">
                    {person.connection[locale]}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm leading-6 text-foreground-secondary">
                {person.profile[locale]}
              </p>

              <div className="mt-7 border-t border-border-subtle pt-5">
                <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
                  {t.case.peopleWorkspace.statements}
                </p>

                {statements.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {statements.map((statement) => (
                      <blockquote
                        key={statement.id}
                        className="border-l-2 border-evidence pl-4"
                      >
                        <p className="text-sm leading-6 text-foreground-secondary">
                          {statement.text[locale]}
                        </p>

                        <footer className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
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