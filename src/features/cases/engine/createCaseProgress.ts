import type { CaseFile } from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export function createCaseProgress(caseFile: CaseFile): CaseProgress {
  return {
    caseId: caseFile.summary.id,
    phase: "briefing",
    discoveredEvidenceIds: caseFile.evidence
      .filter((evidence) => evidence.availability === "initial")
      .map((evidence) => evidence.id),
    reviewedPersonIds: [],
    reviewedStatementIds: [],
    reviewedTimelineEventIds: [],
    boardLinks: [],
  };
}
