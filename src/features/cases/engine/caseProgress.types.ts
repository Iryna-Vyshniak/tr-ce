import type { LocalizedText } from "../../localization/localization.types";

export type InvestigationPhase =
  | "briefing"
  | "investigating"
  | "theory"
  | "accusation"
  | "resolved";

export interface InvestigationBoardLink {
  id: string;
  sourceId: string;
  targetId: string;
  relation:
    | "knows"
    | "was-at"
    | "contradicts"
    | "owns"
    | "motive"
    | "alibi";
}

export interface CaseAccusation {
  suspectId: string;
  motiveFactIds: string[];
  timelineEventIds: string[];
  evidenceIds: string[];
  rejectedEvidenceIds: string[];
  rationale: string;
}

export interface CaseProgress {
  caseId: string;
  phase: InvestigationPhase;
  discoveredEvidenceIds: string[];
  reviewedPersonIds: string[];
  reviewedStatementIds: string[];
  reviewedTimelineEventIds: string[];
  boardLinks: InvestigationBoardLink[];
  accusation?: CaseAccusation;
}

export interface CaseResolution {
  isCorrect: boolean;
  score: number;
  feedback: LocalizedText[];
}
