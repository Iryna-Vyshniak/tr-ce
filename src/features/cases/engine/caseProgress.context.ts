import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CaseProgress } from "./caseProgress.types";

export interface CaseProgressContextValue {
  progress: CaseProgress;
  setProgress: Dispatch<SetStateAction<CaseProgress>>;
  askInterrogationTopic: (personId: string, topicId: string) => string[];
  reviewEvidence: (evidenceId: string) => string[];
}

export const CaseProgressContext =
  createContext<CaseProgressContextValue | null>(null);
