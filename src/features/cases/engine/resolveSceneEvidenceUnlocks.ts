import type {
  SceneExaminationPoint,
} from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export function getNewSceneEvidenceUnlocks(
  progress: CaseProgress,
  scenePoints: SceneExaminationPoint[],
) {
  return scenePoints
    .filter((point) =>
      progress.examinedScenePointIds.includes(point.id),
    )
    .map((point) => point.evidenceId)
    .filter((evidenceId): evidenceId is string => evidenceId !== undefined)
    .filter(
      (evidenceId) =>
        !progress.discoveredEvidenceIds.includes(evidenceId),
    );
}