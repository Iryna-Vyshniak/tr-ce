import type {
  EvidenceUnlockRule,
  InterrogationEvidenceUnlock,
} from "../../../features/cases/types/case.types";

export const case001EvidenceUnlockRules = [
  {
    evidenceId: "ev-004-master-key-log",
    requiredLink: {
      sourceId: "andrii-holub",
      targetId: "ev-001-lock-log",
      relation: "contradicts",
    },
  },
] satisfies EvidenceUnlockRule[];

export const case001InterrogationEvidenceUnlocks = [
  {
    evidenceId: "ev-005-phone-ping",
    interrogationTopicId: "int-001-oleh-departure",
  },
  {
    evidenceId: "ev-007-voice-note",
    interrogationTopicId: "int-002-viktoriia-last-call",
  },
] satisfies InterrogationEvidenceUnlock[];