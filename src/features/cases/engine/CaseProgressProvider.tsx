import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { CaseFile } from "../types/case.types";
import {
  askInterrogationTopic as askInterrogationTopicCommand,
  examineScenePoint as examineScenePointCommand,
  reviewEvidence as reviewEvidenceCommand,
} from "./caseProgress.commands";
import { CaseProgressContext } from "./caseProgress.context";
import {
  loadCaseProgress,
  persistCaseProgress,
} from "./caseProgress.storage";

interface CaseProgressProviderProps {
  caseFile: CaseFile;
  children: ReactNode;
}

export function CaseProgressProvider({
  caseFile,
  children,
}: CaseProgressProviderProps) {
  const [progress, setProgress] = useState(() =>
    loadCaseProgress(caseFile),
  );

  useEffect(() => {
    persistCaseProgress(progress);
  }, [progress]);

  const value = useMemo(
    () => ({
      progress,
      setProgress,
      askInterrogationTopic: (personId: string, topicId: string) => {
        const result = askInterrogationTopicCommand(
          progress,
          caseFile,
          personId,
          topicId,
        );

        if (result.progress !== progress) {
          setProgress(result.progress);
        }

        return result.newEvidenceIds;
      },
      reviewEvidence: (evidenceId: string) => {
        const result = reviewEvidenceCommand(
          progress,
          caseFile,
          evidenceId,
        );

        if (result.progress !== progress) {
          setProgress(result.progress);
        }

        return result.newEvidenceIds;
      },
      examineScenePoint: (pointId: string) => {
        const result = examineScenePointCommand(
          progress,
          caseFile,
          pointId,
        );

        if (result.progress !== progress) {
          setProgress(result.progress);
        }

        return result.newEvidenceIds;
      },
    }),
    [caseFile, progress],
  );

  return (
    <CaseProgressContext.Provider value={value}>
      {children}
    </CaseProgressContext.Provider>
  );
}
