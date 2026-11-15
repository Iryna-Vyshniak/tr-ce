import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CaseProgress, InvestigationBoardLink } from "./caseProgress.types";
export interface CaseProgressContextValue {
  progress: CaseProgress;
  setProgress: Dispatch<SetStateAction<CaseProgress>>;
  askInterrogationTopic: (personId: string, topicId: string) => string[];
  reviewEvidence: (evidenceId: string) => string[];
  examineScenePoint: (pointId: string) => string[];
  createBoardLink: (link: InvestigationBoardLink) => string[];
  removeBoardLink: (linkId: string) => void;
}

export const CaseProgressContext =
  createContext<CaseProgressContextValue | null>(null);
