import type {
  CaseFile,
  CaseSummary,
} from "../../features/cases/types/case.types";
import { case001Evidence } from "./case-001/evidence";
import { case001InterrogationTopics } from "./case-001/interrogations";
import { case001Locations } from "./case-001/locations";
import { case001Metadata } from "./case-001/metadata";
import { case001People } from "./case-001/people";
import {
  case001EvidenceUnlockRules,
  case001InterrogationEvidenceUnlocks,
} from "./case-001/progression";
import { case001ScenePoints } from "./case-001/scene";
import { case001Statements } from "./case-001/statements";
import { case001TheoryMotiveOptions } from "./case-001/theory";
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
  evidenceUnlockRules: case001EvidenceUnlockRules,
  interrogationTopics: case001InterrogationTopics,
  interrogationEvidenceUnlocks: case001InterrogationEvidenceUnlocks,
  scenePoints: case001ScenePoints,
  theoryMotiveOptions: case001TheoryMotiveOptions,
  locations: case001Locations,
  statements: case001Statements,
  timeline: case001Timeline,
} satisfies CaseFile;

export const cases = [case001] as const;

export function getCaseById(caseId: string) {
  return cases.find((caseFile) => caseFile.summary.id === caseId);
}
