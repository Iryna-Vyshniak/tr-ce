import type {
  EvidenceUnlockRule,
} from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export function getNewEvidenceUnlocks(
  progress: CaseProgress,
  rules: EvidenceUnlockRule[],
) {
  return rules
    .filter(
      (rule) =>
        !progress.discoveredEvidenceIds.includes(rule.evidenceId),
    )
    .filter((rule) =>
      rule.requiredReviewedEvidenceIds.every((evidenceId) =>
        progress.reviewedEvidenceIds.includes(evidenceId),
      ),
    )
    .map((rule) => rule.evidenceId);
}
