import type {
  BoardRelation,
  CaseFile,
} from "../types/case.types";
import { createCaseProgress } from "./createCaseProgress";
import type {
  CaseAccusation,
  CaseReportSnapshot,
  CaseProgress,
  InvestigationBoardLink,
  InvestigationPhase,
} from "./caseProgress.types";

type StoredCaseProgress = Omit<
  CaseProgress,
  "askedInterrogationTopicIds" | "examinedScenePointIds"
> & {
  askedInterrogationTopicIds?: unknown;
  examinedScenePointIds?: unknown;
  caseReport?: unknown;
};

const storageKeyPrefix = "tr-ce:case-progress:";

const investigationPhases: InvestigationPhase[] = [
  "briefing",
  "investigating",
  "theory",
  "accusation",
  "resolved",
];

const boardRelations: BoardRelation[] = [
  "knows",
  "was-at",
  "contradicts",
  "owns",
  "motive",
  "alibi",
];

function getStorageKey(caseId: string) {
  return `${storageKeyPrefix}${caseId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isStringArrayRecord(
  value: unknown,
): value is Record<string, string[]> {
  return isRecord(value) && Object.values(value).every(isStringArray);
}


function isInvestigationPhase(
  value: unknown,
): value is InvestigationPhase {
  return (
    typeof value === "string" &&
    investigationPhases.includes(value as InvestigationPhase)
  );
}

function isBoardRelation(value: unknown): value is BoardRelation {
  return (
    typeof value === "string" &&
    boardRelations.includes(value as BoardRelation)
  );
}

function isBoardLink(value: unknown): value is InvestigationBoardLink {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.sourceId === "string" &&
    typeof value.targetId === "string" &&
    isBoardRelation(value.relation)
  );
}

function isCaseAccusation(value: unknown): value is CaseAccusation {
  return (
    isRecord(value) &&
    typeof value.suspectId === "string" &&
    isStringArray(value.motiveFactIds) &&
    isStringArray(value.timelineEventIds) &&
    isStringArray(value.evidenceIds) &&
    isStringArray(value.rejectedEvidenceIds) &&
    (value.alternativeSuspectIds === undefined ||
      isStringArray(value.alternativeSuspectIds)) &&
    typeof value.rationale === "string"
  );
}

function isCaseReport(value: unknown, caseId: string): value is CaseReportSnapshot {
  return (
    isRecord(value) &&
    value.caseId === caseId &&
    typeof value.id === "string" &&
    typeof value.createdAt === "string" &&
    value.policyVersion === "case-report-v1" &&
    isCaseAccusation(value.accusation) &&
    isStringArray(value.reviewedEvidenceIds) &&
    isStringArray(value.askedInterrogationTopicIds) &&
    isStringArray(value.examinedScenePointIds) &&
    Array.isArray(value.boardLinks) &&
    value.boardLinks.every(isBoardLink)
  );
}

function isStoredCaseProgress(
  value: unknown,
  caseId: string,
): value is StoredCaseProgress {
  return (
    isRecord(value) &&
    value.caseId === caseId &&
    isInvestigationPhase(value.phase) &&
    isStringArray(value.discoveredEvidenceIds) &&
    isStringArray(value.reviewedPersonIds) &&
    isStringArray(value.reviewedStatementIds) &&
    isStringArray(value.reviewedTimelineEventIds) &&
    Array.isArray(value.boardLinks) &&
    value.boardLinks.every(isBoardLink) &&
    (value.accusation === undefined || isCaseAccusation(value.accusation)) &&
    (value.caseReport === undefined || isCaseReport(value.caseReport, caseId))
  );
}

export function loadCaseProgress(caseFile: CaseFile): CaseProgress {
  const initialProgress = createCaseProgress(caseFile);

  if (typeof window === "undefined") {
    return initialProgress;
  }

  try {
    const savedProgress = window.localStorage.getItem(
      getStorageKey(caseFile.summary.id),
    );

    if (!savedProgress) {
      return initialProgress;
    }

    const parsedProgress: unknown = JSON.parse(savedProgress);

    if (!isStoredCaseProgress(parsedProgress, caseFile.summary.id)) {
      return initialProgress;
    }

    return {
      caseId: parsedProgress.caseId,
      phase: parsedProgress.phase,
      discoveredEvidenceIds: parsedProgress.discoveredEvidenceIds,
      
            reviewedEvidenceIds: isStringArray(
        parsedProgress.reviewedEvidenceIds,
      )
        ? parsedProgress.reviewedEvidenceIds
        : [],
reviewedPersonIds: parsedProgress.reviewedPersonIds,
      reviewedStatementIds: parsedProgress.reviewedStatementIds,
      reviewedTimelineEventIds: parsedProgress.reviewedTimelineEventIds,
      askedInterrogationTopicIds: isStringArray(
        parsedProgress.askedInterrogationTopicIds,
      )
        ? parsedProgress.askedInterrogationTopicIds
        : [],
                    characterKnowledgeByPersonId: isStringArrayRecord(
        parsedProgress.characterKnowledgeByPersonId,
      )
        ? parsedProgress.characterKnowledgeByPersonId
        : {},
      examinedScenePointIds: isStringArray(
        parsedProgress.examinedScenePointIds,
      )
        ? parsedProgress.examinedScenePointIds
        : [],
      boardLinks: parsedProgress.boardLinks,
      accusation: parsedProgress.accusation
        ? {
            ...parsedProgress.accusation,
            alternativeSuspectIds: isStringArray(
              parsedProgress.accusation.alternativeSuspectIds,
            )
              ? parsedProgress.accusation.alternativeSuspectIds
              : [],
          }
        : undefined,
      caseReport: parsedProgress.caseReport,
    };
  } catch {
    return initialProgress;
  }
}

export function persistCaseProgress(progress: CaseProgress) {
  try {
    window.localStorage.setItem(
      getStorageKey(progress.caseId),
      JSON.stringify(progress),
    );
  } catch {
    // Якщо браузер блокує localStorage, гра все одно працює в поточній сесії.
  }
}
