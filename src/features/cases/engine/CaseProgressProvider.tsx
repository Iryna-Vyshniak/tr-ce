import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CaseFile } from "../types/case.types";
import { createCaseProgress } from "./createCaseProgress";
import { CaseProgressContext } from "./caseProgress.context";

interface CaseProgressProviderProps {
  caseFile: CaseFile;
  children: ReactNode;
}

export function CaseProgressProvider({
  caseFile,
  children,
}: CaseProgressProviderProps) {
  const [progress, setProgress] = useState(() =>
    createCaseProgress(caseFile),
  );

  const value = useMemo(
    () => ({
      progress,
      setProgress,
    }),
    [progress],
  );

  return (
    <CaseProgressContext.Provider value={value}>
      {children}
    </CaseProgressContext.Provider>
  );
}