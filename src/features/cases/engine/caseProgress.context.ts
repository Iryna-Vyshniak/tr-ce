import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CaseProgress, InvestigationBoardLink } from "./caseProgress.types";
import type { CaseAccusation } from "./caseProgress.types";
export interface CaseProgressContextValue {
  progress: CaseProgress;
  setProgress: Dispatch<SetStateAction<CaseProgress>>;
  askInterrogationTopic: (personId: string, topicId: string) => string[];
  reviewEvidence: (evidenceId: string) => string[];
  examineScenePoint: (pointId: string) => string[];
  createBoardLink: (link: InvestigationBoardLink) => string[];
  removeBoardLink: (linkId: string) => void;
  updateAccusation: (update: Partial<CaseAccusation>) => void;
}

export const CaseProgressContext =
  createContext<CaseProgressContextValue | null>(null);
