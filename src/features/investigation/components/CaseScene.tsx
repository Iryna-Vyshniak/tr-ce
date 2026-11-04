import { useState } from "react";

import { activeCaseFile } from "../../cases/data/activeCase";
import { getNewSceneEvidenceUnlocks } from "../../cases/engine/resolveSceneEvidenceUnlocks";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import { useLocale } from "../../localization/hooks/useLocale";

export function CaseScene() {
  const { locale, t } = useLocale();
  const { progress, setProgress } = useCaseProgress();

  const scenePoints = activeCaseFile.scenePoints.filter(
    (point) => point.locationId === "room-714",
  );

  const [selectedPointId, setSelectedPointId] = useState(
    () => scenePoints[0]?.id ?? "",
  );

  const [lastUnlockedEvidenceIds, setLastUnlockedEvidenceIds] = useState<
    string[]
  >([]);

  const selectedPoint = scenePoints.find(
    (point) => point.id === selectedPointId,
  );

  function handleExaminePoint(pointId: string) {
    if (progress.examinedScenePointIds.includes(pointId)) {
      return;
    }

    const nextProgress = {
      ...progress,
      examinedScenePointIds: [
        ...progress.examinedScenePointIds,
        pointId,
      ],
    };

    const newEvidenceIds = getNewSceneEvidenceUnlocks(
      nextProgress,
      scenePoints,
    );

    setProgress({
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([
          ...progress.discoveredEvidenceIds,
          ...newEvidenceIds,
        ]),
      ],
    });

    setLastUnlockedEvidenceIds(newEvidenceIds);
  }

  return (
    <section aria-labelledby="case-scene-title">
      <div className="section-heading-spacing content-gap flex flex-col border-b border-border lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-evidence">
            {t.case.sceneWorkspace.eyebrow}
          </p>

          <h2
            id="case-scene-title"
            className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl"
          >
            {t.case.sceneWorkspace.title}
          </h2>

          <p className="mt-5 text-base leading-7 text-foreground-secondary">
            {t.case.sceneWorkspace.description}
          </p>
        </div>

        <dl className="shrink-0 font-mono text-xs uppercase tracking-[0.1em]">
          <dt className="text-muted-foreground">
            {t.case.sceneWorkspace.examined}
          </dt>

          <dd className="mt-2 text-lg font-semibold text-signal">
            {String(progress.examinedScenePointIds.length).padStart(2, "0")} /
            {" "}
            {String(scenePoints.length).padStart(2, "0")}
          </dd>
        </dl>
      </div>

      <div className="section-content-spacing content-gap grid xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div
          className="relative min-h-[30rem] overflow-hidden border border-border bg-surface"
          aria-label={t.case.sceneWorkspace.roomLabel}
        >
          <div className="absolute inset-5 border border-border-subtle" />

          <div className="absolute inset-x-5 top-5 h-20 border-b border-border-subtle bg-surface-elevated/50" />

          <div className="absolute bottom-5 left-5 h-28 w-24 border-r border-t border-border-subtle bg-background/40" />

          <div className="absolute bottom-5 right-5 h-36 w-40 border border-border-subtle bg-background/40" />

          <p className="absolute left-9 top-9 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t.case.sceneWorkspace.roomLabel}
          </p>

          <p className="absolute right-9 top-9 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
            714 // 7F
          </p>

          {scenePoints.map((point, index) => {
            const isSelected = point.id === selectedPointId;
            const isExamined = progress.examinedScenePointIds.includes(
              point.id,
            );

            return (
              <button
                key={point.id}
                type="button"
                aria-label={`${t.case.sceneWorkspace.selectedPoint}: ${point.title[locale]}`}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedPointId(point.id);
                  setLastUnlockedEvidenceIds([]);
                }}
                className={[
                  "absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-2",
                  "font-mono text-xs font-semibold transition-colors duration-200",
                  isSelected
                    ? "border-signal bg-signal text-background"
                    : isExamined
                      ? "border-evidence bg-evidence/20 text-evidence"
                      : "border-border bg-background text-muted-foreground hover:border-signal hover:text-signal",
                ].join(" ")}
                style={{
                  left: `${point.position.x}%`,
                  top: `${point.position.y}%`,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>

        <aside className="card-spacing border border-border bg-surface">
          {selectedPoint ? (
            <>
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-evidence">
                {t.case.sceneWorkspace.selectedPoint}
              </p>

              <h3 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em]">
                {selectedPoint.title[locale]}
              </h3>

              {progress.examinedScenePointIds.includes(
                selectedPoint.id,
              ) ? (
                <div className="mt-6 border-l-2 border-evidence pl-4">
                  <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-evidence">
                    {t.case.sceneWorkspace.observation}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                    {selectedPoint.observation[locale]}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleExaminePoint(selectedPoint.id)}
                  className="mt-6 min-h-11 border border-evidence bg-evidence/10 px-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-evidence transition-colors duration-200 hover:bg-evidence hover:text-background"
                >
                  {t.case.sceneWorkspace.examine}
                </button>
              )}

              {lastUnlockedEvidenceIds.length > 0 && (
                <p
                  className="mt-6 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm leading-6 text-signal"
                  role="status"
                >
                  {t.case.sceneWorkspace.materialUnlocked}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {t.case.sceneWorkspace.selectPoint}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
