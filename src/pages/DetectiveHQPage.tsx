export function DetectiveHQPage() {
  return (
    <section
      id="hq"
      aria-labelledby="hq-title"
      className="mx-auto w-full max-w-[100rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="max-w-4xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-signal">
          Detective Headquarters
        </p>

        <h1
          id="hq-title"
          className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] sm:text-7xl lg:text-8xl"
        >
          Follow the
          <br />
          <span className="text-signal">evidence.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-secondary sm:text-lg">
          Every statement leaves a trace. Every trace creates a connection.
          Examine the evidence, question the story, and decide what really
          happened.
        </p>
      </div>

      <div className="mt-12 border-t border-border-subtle pt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.1em]">
          <p className="text-muted-foreground">
            Active cases{" "}
            <strong className="font-medium text-foreground">01</strong>
          </p>

          <p className="text-muted-foreground">
            Evidence{" "}
            <strong className="font-medium text-evidence">07</strong>
          </p>

          <p className="text-muted-foreground">
            Contradictions{" "}
            <strong className="font-medium text-critical">01</strong>
          </p>
        </div>
      </div>
    </section>
  );
}