import type { CaseFile } from "../types/case.types";
import { getNewInterrogationEvidenceUnlocks } from "./resolveInterrogationEvidenceUnlocks";
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
