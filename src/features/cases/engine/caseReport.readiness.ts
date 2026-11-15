import type { CaseFile } from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export type CaseReportRequirementId =
  | "subject"
  | "motive"
  | "evidence"
  | "interpretation"
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
 * correctness is evaluated outside the client boundary.
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
  const selectedInterpretationIds = accusation?.interpretationIds ?? [];
  const selectedSuspectId = accusation?.suspectId ?? "";
  const selectedEvidenceIsReviewed =
    selectedEvidenceIds.length >= 2 &&
    selectedEvidenceIds.every((evidenceId) => reviewedEvidenceIds.has(evidenceId));
  const selectedTimelineIsAvailable =
    selectedTimelineIds.length > 0 &&
    selectedTimelineIds.every((eventId) => availableTimelineIds.has(eventId));
  const selectedInterpretations = caseFile.interpretations.filter(
    (interpretation) => selectedInterpretationIds.includes(interpretation.id),
  );
  const interpretationsAreGrounded =
    selectedInterpretations.length > 0 &&
    selectedInterpretations.every((interpretation) =>
      interpretation.observationEvidenceIds.every((evidenceId) =>
        reviewedEvidenceIds.has(evidenceId),
      ),
    );
  const graphConnectsClaim = selectedInterpretations.some(
    (interpretation) => {
      const observationLinkExists = interpretation.observationEvidenceIds.some(
        (evidenceId) =>
          selectedEvidenceIds.includes(evidenceId) &&
          progress.boardLinks.some(
            (link) =>
              ((link.sourceId === evidenceId &&
                link.targetId === interpretation.id) ||
                (link.targetId === evidenceId &&
                  link.sourceId === interpretation.id)) &&
              (link.relation === "supports" || link.relation === "explains"),
          ),
      );
      const conclusionLinkExists = progress.boardLinks.some(
        (link) =>
          ((link.sourceId === interpretation.id &&
            link.targetId === selectedSuspectId) ||
            (link.targetId === interpretation.id &&
              link.sourceId === selectedSuspectId)) &&
          (link.relation === "supports" || link.relation === "explains"),
      );

      return observationLinkExists && conclusionLinkExists;
    },
  );

  const requirements: CaseReportRequirement[] = [
    { id: "subject", satisfied: selectedSuspectId.length > 0 },
    { id: "motive", satisfied: (accusation?.motiveFactIds.length ?? 0) > 0 },
    { id: "evidence", satisfied: selectedEvidenceIsReviewed },
    { id: "interpretation", satisfied: interpretationsAreGrounded },
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
