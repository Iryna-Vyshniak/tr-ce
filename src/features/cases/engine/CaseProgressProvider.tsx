import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CaseFile } from "../types/case.types";
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
    }),
    [progress],
  );

  return (
    <CaseProgressContext.Provider value={value}>
      {children}
    </CaseProgressContext.Provider>
  );
}