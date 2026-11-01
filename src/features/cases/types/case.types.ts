import type { LocalizedText } from "../../localization/localization.types";

export type CaseStatus = "active" | "pending" | "solved" | "archived";

export interface CaseSummary {
  id: string;
  caseNumber: string;

  title: LocalizedText;
  classification: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  lastTrace: LocalizedText;

  status: CaseStatus;
  occurredAt: string;

  progress: number;
  evidenceCount: number;
  suspectCount: number;
  contradictionCount: number;
}