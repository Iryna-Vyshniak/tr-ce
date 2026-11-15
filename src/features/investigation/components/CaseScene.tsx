import { useState } from "react";

import evidenceGlassShardImage from "../../../assets/evidence-glass-shard.png";
import glassRoomMainImage from "../../../assets/glass-room-main.png";
import sceneEntryLockImage from "../../../assets/scene-entry-lock.png";
import scenePanoramicWallImage from "../../../assets/scene-panoramic-wall.png";
import sceneWorkDeskImage from "../../../assets/scene-work-desk.png";
import { activeCaseFile } from "../../cases/data/activeCase";
import { useCaseProgress } from "../../cases/engine/useCaseProgress";
import { useLocale } from "../../localization/hooks/useLocale";

const scenePointAnchors: Record<string, { x: number; y: number }> = {
  // These coordinates follow stable landmarks in the scene image, not case data.
  "scene-001-entry-lock": { x: 17, y: 40 },
  "scene-002-work-desk": { x: 62, y: 72 },
  "scene-003-panoramic-wall": { x: 84, y: 26 },
  "scene-004-inner-wall": { x: 47, y: 53 },
};

const sceneDetailImages: Record<string, string> = {
  "scene-001-entry-lock": sceneEntryLockImage,
  "scene-002-work-desk": sceneWorkDeskImage,
  "scene-003-panoramic-wall": scenePanoramicWallImage,
  "scene-004-inner-wall": evidenceGlassShardImage,
};

export function CaseScene() {
  const { locale, t } = useLocale();
  const { progress, examineScenePoint } = useCaseProgress();

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
  const selectedPointImage = selectedPoint
    ? sceneDetailImages[selectedPoint.id]
    : undefined;

  function handleExaminePoint(pointId: string) {
    const newEvidenceIds = examineScenePoint(pointId);

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
          className="trce-scene trce-glass-room border border-border"
          role="group"
          aria-label={t.case.sceneWorkspace.roomLabel}
        >
          <img
            alt=""
            aria-hidden="true"
            className="trce-scene-media trce-glass-room__media"
            src={glassRoomMainImage}
          />
          <div className="trce-scene-overlay" aria-hidden="true" />

          <p className="trce-scene__label">
            {t.case.sceneWorkspace.roomLabel}
          </p>

          <p className="trce-scene__coordinate">
            714 // 7F
          </p>

          {scenePoints.map((point, index) => {
            const isSelected = point.id === selectedPointId;
            const isExamined = progress.examinedScenePointIds.includes(
              point.id,
            );
            const anchor = scenePointAnchors[point.id] ?? point.position;

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
                  "trce-hotspot -translate-x-1/2 -translate-y-1/2",
                  isSelected
                    ? "trce-hotspot--selected"
                    : isExamined
                      ? "trce-hotspot--examined"
                      : "",
                ].join(" ")}
                style={{
                  left: `${anchor.x}%`,
                  top: `${anchor.y}%`,
                }}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
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
                <>
                  {selectedPointImage && (
                    <figure className="trce-scene-detail mt-6">
                      <img
                        alt={`${selectedPoint.title[locale]} — ${selectedPoint.observation[locale]}`}
                        src={selectedPointImage}
                      />
                      <figcaption>
                        {selectedPoint.title[locale]}
                      </figcaption>
                    </figure>
                  )}

                  <div className="mt-6 border-l-2 border-evidence pl-4">
                    <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-evidence">
                      {t.case.sceneWorkspace.observation}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                      {selectedPoint.observation[locale]}
                    </p>
                  </div>
                </>
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
