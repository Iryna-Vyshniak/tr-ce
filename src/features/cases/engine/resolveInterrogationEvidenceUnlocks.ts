import type {
  InterrogationEvidenceUnlock,
} from "../types/case.types";
import type { CaseProgress } from "./caseProgress.types";

export function getNewInterrogationEvidenceUnlocks(
  progress: CaseProgress,
  rules: InterrogationEvidenceUnlock[],
) {
  return rules
    .filter(
      (rule) =>
        !progress.discoveredEvidenceIds.includes(rule.evidenceId),
    )
    .filter((rule) =>
      progress.askedInterrogationTopicIds.includes(
        rule.interrogationTopicId,
      ),
    )
    .map((rule) => rule.evidenceId);
}