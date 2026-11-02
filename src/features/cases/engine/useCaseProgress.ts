import { useContext } from "react";

import { CaseProgressContext } from "./caseProgress.context";

export function useCaseProgress() {
  const context = useContext(CaseProgressContext);

  if (!context) {
    throw new Error(
      "useCaseProgress must be used within a CaseProgressProvider",
    );
  }

  return context;
}