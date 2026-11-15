import type { CaseFile } from "../types/case.types";
import { getNewInterrogationEvidenceUnlocks } from "./resolveInterrogationEvidenceUnlocks";
import { getNewEvidenceUnlocks } from "./resolveEvidenceUnlocks";
import type { CaseProgress } from "./caseProgress.types";

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
  if (progress.askedInterrogationTopicIds.includes(topicId)) {
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
