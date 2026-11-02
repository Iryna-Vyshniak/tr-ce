import type {
  CaseFile,
  CaseSummary,
} from "../../features/cases/types/case.types";
import { case001Evidence } from "./case-001/evidence";
import { case001Locations } from "./case-001/locations";
import { case001Metadata } from "./case-001/metadata";
import { case001People } from "./case-001/people";
import { case001Statements } from "./case-001/statements";
import { case001Timeline } from "./case-001/timeline";

export const case001Summary = {
  ...case001Metadata,
  evidenceCount: case001Evidence.length,
  suspectCount: case001People.filter((person) => person.role === "suspect")
    .length,
  contradictionCount: case001Metadata.knownContradictionCount,
} satisfies CaseSummary;

export const case001 = {
  summary: case001Summary,
  metadata: case001Metadata,
  people: case001People,
  evidence: case001Evidence,
  locations: case001Locations,
  statements: case001Statements,
  timeline: case001Timeline,
} satisfies CaseFile;

export const cases = [case001] as const;

export function getCaseById(caseId: string) {
  return cases.find((caseFile) => caseFile.summary.id === caseId);
}
