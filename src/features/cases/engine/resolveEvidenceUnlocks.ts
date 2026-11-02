import type {
  EvidenceUnlockRule,
} from "../types/case.types";
import type {
  CaseProgress,
  InvestigationBoardLink,
} from "./caseProgress.types";

function doesLinkMatchRule(
  link: InvestigationBoardLink,
  rule: EvidenceUnlockRule,
) {
  const connectsRequiredNodes =
    (link.sourceId === rule.requiredLink.sourceId &&
      link.targetId === rule.requiredLink.targetId) ||
    (link.sourceId === rule.requiredLink.targetId &&
      link.targetId === rule.requiredLink.sourceId);

  return (
    connectsRequiredNodes &&
    link.relation === rule.requiredLink.relation
  );
}

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
      progress.boardLinks.some((link) =>
        doesLinkMatchRule(link, rule),
      ),
    )
    .map((rule) => rule.evidenceId);
}