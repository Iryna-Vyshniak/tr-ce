import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CaseProgress } from "./caseProgress.types";

export interface CaseProgressContextValue {
  progress: CaseProgress;
  setProgress: Dispatch<SetStateAction<CaseProgress>>;
}

export const CaseProgressContext =
  createContext<CaseProgressContextValue | null>(null);