import type { CaseFile } from "../types/case.types";
import { getNewInterrogationEvidenceUnlocks } from "./resolveInterrogationEvidenceUnlocks";
import { getNewEvidenceUnlocks } from "./resolveEvidenceUnlocks";
import type { CaseProgress, InvestigationBoardLink } from "./caseProgress.types";
import type {
  CaseAccusation,
  CaseReportSnapshot,
} from "./caseProgress.types";
import { getNewSceneEvidenceUnlocks } from "./resolveSceneEvidenceUnlocks";
import { getCaseReportReadiness } from "./caseReport.readiness";

export interface AskInterrogationTopicResult {
  progress: CaseProgress;
  newEvidenceIds: string[];
}

export function askInterrogationTopic(
  progress: CaseProgress,
  caseFile: CaseFile,
  personId: string,
  topicId: string,
): AskInterrogationTopicResult {
  if (progress.caseReport || progress.askedInterrogationTopicIds.includes(topicId)) {
    return { progress, newEvidenceIds: [] };
  }

  const nextProgress = {
    ...progress,
    askedInterrogationTopicIds: [
      ...progress.askedInterrogationTopicIds,
      topicId,
    ],
    characterKnowledgeByPersonId: {
      ...progress.characterKnowledgeByPersonId,
      [personId]: [
        ...new Set([
          ...(progress.characterKnowledgeByPersonId[personId] ?? []),
          topicId,
        ]),
      ],
    },
  };
  const newEvidenceIds = getNewInterrogationEvidenceUnlocks(
    nextProgress,
    caseFile.interrogationEvidenceUnlocks,
  );

  return {
    progress: {
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([
          ...progress.discoveredEvidenceIds,
          ...newEvidenceIds,
        ]),
      ],
    },
    newEvidenceIds,
  };
}


export function reviewEvidence(
  progress: CaseProgress,
  caseFile: CaseFile,
  evidenceId: string,
) {
  if (
    progress.caseReport ||
    !progress.discoveredEvidenceIds.includes(evidenceId) ||
    progress.reviewedEvidenceIds.includes(evidenceId)
  ) {
    return { progress, newEvidenceIds: [] };
  }

  const nextProgress = {
    ...progress,
    reviewedEvidenceIds: [...progress.reviewedEvidenceIds, evidenceId],
  };
  const newEvidenceIds = getNewEvidenceUnlocks(
    nextProgress,
    caseFile.evidenceUnlockRules,
  );

  return {
    progress: {
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([
          ...progress.discoveredEvidenceIds,
          ...newEvidenceIds,
        ]),
      ],
    },
    newEvidenceIds,
  };
}

export function examineScenePoint(
  progress: CaseProgress,
  caseFile: CaseFile,
  pointId: string,
) {
  if (progress.caseReport || progress.examinedScenePointIds.includes(pointId)) {
    return { progress, newEvidenceIds: [] };
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
    caseFile.scenePoints,
  );

  return {
    progress: {
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([
          ...progress.discoveredEvidenceIds,
          ...newEvidenceIds,
        ]),
      ],
    },
    newEvidenceIds,
  };
}

export function createBoardLink(
  progress: CaseProgress,
  caseFile: CaseFile,
  link: InvestigationBoardLink,
) {
  if (progress.caseReport) {
    return { progress, newEvidenceIds: [] };
  }

  const nextProgress = {
    ...progress,
    phase: progress.phase === "briefing" ? "investigating" : progress.phase,
    boardLinks: [...progress.boardLinks, link],
  };

  const newEvidenceIds = getNewEvidenceUnlocks(
    nextProgress,
    caseFile.evidenceUnlockRules,
  );

  return {
    progress: {
      ...nextProgress,
      discoveredEvidenceIds: [
        ...new Set([...progress.discoveredEvidenceIds, ...newEvidenceIds]),
      ],
    },
    newEvidenceIds,
  };
}

export function removeBoardLink(progress: CaseProgress, linkId: string) {
  if (progress.caseReport || !progress.boardLinks.some((link) => link.id === linkId)) {
    return progress;
  }

  return {
    ...progress,
    boardLinks: progress.boardLinks.filter((link) => link.id !== linkId),
  };
}
const emptyAccusation: CaseAccusation = {
  suspectId: "",
  interpretationIds: [],
  motiveFactIds: [],
  timelineEventIds: [],
  evidenceIds: [],
  rejectedEvidenceIds: [],
  alternativeSuspectIds: [],
  rationale: "",
};

export function updateCaseAccusation(
  progress: CaseProgress,
  update: Partial<CaseAccusation>,
): CaseProgress {
  if (progress.caseReport) {
    return progress;
  }

  return {
    ...progress,
    phase: "theory",
    accusation: {
      ...(progress.accusation ?? emptyAccusation),
      ...update,
    },
  };
}

export function finalizeCaseReport(
  progress: CaseProgress,
  caseFile: CaseFile,
  reportId: string,
  createdAt: string,
): CaseProgress {
  if (progress.caseReport || !progress.accusation) {
    return progress;
  }

  const readiness = getCaseReportReadiness(progress, caseFile);

  if (!readiness.isReady) {
    return progress;
  }

  const caseReport: CaseReportSnapshot = {
    id: reportId,
    caseId: progress.caseId,
    createdAt,
    policyVersion: "case-report-v1",
    accusation: {
      ...progress.accusation,
      interpretationIds: [...progress.accusation.interpretationIds],
      motiveFactIds: [...progress.accusation.motiveFactIds],
      timelineEventIds: [...progress.accusation.timelineEventIds],
      evidenceIds: [...progress.accusation.evidenceIds],
      rejectedEvidenceIds: [...progress.accusation.rejectedEvidenceIds],
      alternativeSuspectIds: [...progress.accusation.alternativeSuspectIds],
    },
    reviewedEvidenceIds: [...progress.reviewedEvidenceIds],
    askedInterrogationTopicIds: [...progress.askedInterrogationTopicIds],
    examinedScenePointIds: [...progress.examinedScenePointIds],
    boardLinks: progress.boardLinks.map((link) => ({ ...link })),
  };

  return {
    ...progress,
    phase: "resolved",
    caseReport,
  };
}
