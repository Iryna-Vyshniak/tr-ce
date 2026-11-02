import type {
  BoardRelation,
  CaseFile,
} from "../types/case.types";
import { createCaseProgress } from "./createCaseProgress";
import type {
  CaseAccusation,
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
    typeof value.rationale === "string"
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
    (value.accusation === undefined || isCaseAccusation(value.accusation))
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
      reviewedPersonIds: parsedProgress.reviewedPersonIds,
      reviewedStatementIds: parsedProgress.reviewedStatementIds,
      reviewedTimelineEventIds: parsedProgress.reviewedTimelineEventIds,
      askedInterrogationTopicIds: isStringArray(
        parsedProgress.askedInterrogationTopicIds,
      )
        ? parsedProgress.askedInterrogationTopicIds
        : [],
      examinedScenePointIds: isStringArray(
        parsedProgress.examinedScenePointIds,
      )
        ? parsedProgress.examinedScenePointIds
        : [],
      boardLinks: parsedProgress.boardLinks,
      accusation: parsedProgress.accusation,
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
