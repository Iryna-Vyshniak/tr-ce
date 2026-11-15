import type { BoardRelation } from "../types/case.types";

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
  relation: BoardRelation;
}

export interface CaseAccusation {
  suspectId: string;
  motiveFactIds: string[];
  timelineEventIds: string[];
  evidenceIds: string[];
  rejectedEvidenceIds: string[];
  alternativeSuspectIds: string[];
  rationale: string;
}

export interface CaseReportSnapshot {
  id: string;
  caseId: string;
  createdAt: string;
  policyVersion: "case-report-v1";
  accusation: CaseAccusation;
  reviewedEvidenceIds: string[];
  askedInterrogationTopicIds: string[];
  examinedScenePointIds: string[];
  boardLinks: InvestigationBoardLink[];
}

export interface CaseProgress {
  caseId: string;
  phase: InvestigationPhase;
  discoveredEvidenceIds: string[];
  reviewedEvidenceIds: string[];
  reviewedPersonIds: string[];
  reviewedStatementIds: string[];
  reviewedTimelineEventIds: string[];
  askedInterrogationTopicIds: string[];
    characterKnowledgeByPersonId: Record<string, string[]>;
  examinedScenePointIds: string[];
  boardLinks: InvestigationBoardLink[];
  accusation?: CaseAccusation;
  caseReport?: CaseReportSnapshot;
}
