import type { CaseFile } from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export type CaseReportRequirementId =
  | "subject"
  | "motive"
  | "evidence"
  | "timeline"
  | "countercase"
  | "graph"
  | "rationale";

export interface CaseReportRequirement {
  id: CaseReportRequirementId;
  satisfied: boolean;
}

export interface CaseReportReadiness {
  isReady: boolean;
  requirements: CaseReportRequirement[];
}

/**
 * Checks whether a client-side report is complete and traceable.
 * It intentionally does not assess whether the accusation is true; that
 * comparison belongs to the protected server-side Ground Truth boundary.
 */
export function getCaseReportReadiness(
  progress: CaseProgress,
  caseFile: CaseFile,
): CaseReportReadiness {
  const accusation = progress.accusation;
  const discoveredEvidenceIds = new Set(progress.discoveredEvidenceIds);
  const reviewedEvidenceIds = new Set(progress.reviewedEvidenceIds);
  const availableTimelineIds = new Set(
    caseFile.timeline
      .filter((event) =>
        event.relatedEvidenceIds.every((evidenceId) =>
          discoveredEvidenceIds.has(evidenceId),
        ),
      )
      .map((event) => event.id),
  );

  const selectedEvidenceIds = accusation?.evidenceIds ?? [];
  const selectedTimelineIds = accusation?.timelineEventIds ?? [];
  const selectedSuspectId = accusation?.suspectId ?? "";
  const selectedEvidenceIsReviewed =
    selectedEvidenceIds.length >= 2 &&
    selectedEvidenceIds.every((evidenceId) => reviewedEvidenceIds.has(evidenceId));
  const selectedTimelineIsAvailable =
    selectedTimelineIds.length > 0 &&
    selectedTimelineIds.every((eventId) => availableTimelineIds.has(eventId));
  const graphConnectsClaim = progress.boardLinks.some((link) => {
    const linkedToSuspect =
      link.sourceId === selectedSuspectId || link.targetId === selectedSuspectId;
    const linkedEvidenceId =
      link.sourceId === selectedSuspectId ? link.targetId : link.sourceId;

    return linkedToSuspect && selectedEvidenceIds.includes(linkedEvidenceId);
  });

  const requirements: CaseReportRequirement[] = [
    { id: "subject", satisfied: selectedSuspectId.length > 0 },
    { id: "motive", satisfied: (accusation?.motiveFactIds.length ?? 0) > 0 },
    { id: "evidence", satisfied: selectedEvidenceIsReviewed },
    { id: "timeline", satisfied: selectedTimelineIsAvailable },
    {
      id: "countercase",
      satisfied:
        (accusation?.alternativeSuspectIds.length ?? 0) > 0 ||
        (accusation?.rejectedEvidenceIds.length ?? 0) > 0,
    },
    { id: "graph", satisfied: graphConnectsClaim },
    {
      id: "rationale",
      satisfied: (accusation?.rationale.trim().length ?? 0) >= 120,
    },
  ];

  return {
    isReady: requirements.every((requirement) => requirement.satisfied),
    requirements,
  };
}

export function getCaseCompletion(progress: CaseProgress, caseFile: CaseFile) {
  if (progress.caseReport) {
    return 100;
  }

  const actionsCompleted =
    progress.reviewedEvidenceIds.length +
    progress.askedInterrogationTopicIds.length +
    progress.examinedScenePointIds.length +
    progress.boardLinks.length;
  const totalActions =
    caseFile.evidence.length +
    caseFile.interrogationTopics.length +
    caseFile.scenePoints.length +
    3;
  const readiness = getCaseReportReadiness(progress, caseFile);
  const base = Math.round((actionsCompleted / totalActions) * 85);

  return Math.min(99, base + (readiness.isReady ? 14 : 0));
}
