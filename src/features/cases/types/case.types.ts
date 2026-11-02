import type { LocalizedText } from '../../localization/localization.types';

export type CaseStatus = 'active' | 'pending' | 'solved' | 'archived';

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

export interface CaseMetadata {
  id: string;
  caseNumber: string;

  title: LocalizedText;
  classification: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  lastTrace: LocalizedText;

  status: CaseStatus;
  occurredOn: string;
  occurredAt: string;
  progress: number;
  knownContradictionCount: number;
}

export type PersonRole = 'victim' | 'suspect' | 'witness' | 'person-of-interest';

export interface CasePerson {
  id: string;
  name: LocalizedText;
  role: PersonRole;
  occupation: LocalizedText;
  connection: LocalizedText;
  profile: LocalizedText;
}

export type EvidenceKind = 'physical' | 'document' | 'digital';
export type EvidenceStatus = 'verified' | 'lead';
export type EvidenceAvailability = 'initial' | 'discoverable';

export type BoardRelation = 'knows' | 'was-at' | 'contradicts' | 'owns' | 'motive' | 'alibi';

export interface CaseEvidence {
  id: string;
  catalogNumber: string;
  kind: EvidenceKind;
  status: EvidenceStatus;
  availability: EvidenceAvailability;
  title: LocalizedText;
  description: LocalizedText;
  foundAt: string;
  locationId: string;
  relatedPersonIds: string[];
}

export interface EvidenceUnlockRule {
  evidenceId: string;
  requiredLink: {
    sourceId: string;
    targetId: string;
    relation: BoardRelation;
  };
}

export interface InterrogationTopic {
  id: string;
  personId: string;
  question: LocalizedText;
  response: LocalizedText;
  requiredEvidenceIds: string[];
}

export interface InterrogationEvidenceUnlock {
  evidenceId: string;
  interrogationTopicId: string;
}

export interface SceneExaminationPoint {
  id: string;
  locationId: string;
  position: {
    x: number;
    y: number;
  };
  title: LocalizedText;
  observation: LocalizedText;
  evidenceId?: string;
}

export interface TheoryMotiveOption {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface CaseLocation {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  relevance: LocalizedText;
}

export interface WitnessStatement {
  id: string;
  speakerId: string;
  recordedAt: string;
  claimedTime: string;
  text: LocalizedText;
}

export type TimelineEventStatus = 'confirmed' | 'disputed' | 'inferred';

export interface TimelineEvent {
  id: string;
  occurredAt: string;
  status: TimelineEventStatus;
  title: LocalizedText;
  description: LocalizedText;
  relatedEvidenceIds: string[];
  relatedPersonIds: string[];
}

export interface CaseContradiction {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  evidenceIds: string[];
  statementIds: string[];
}

export interface CaseFact {
  id: string;
  text: LocalizedText;
}

export interface CharacterRelationship {
  characterId: string;
  relationship: LocalizedText;
}

export interface CharacterPrivateState {
  characterId: string;
  personality: LocalizedText[];
  relationships: CharacterRelationship[];
  knownFactIds: string[];
  secretFactIds: string[];
  actualTimelineEventIds: string[];
  lieStatementIds: string[];
  unknownFactIds: string[];
  emotionalState: LocalizedText;
}

export interface CaseResolutionCriteria {
  requiredCulpritId: string;
  requiredMotiveFactIds: string[];
  requiredTimelineEventIds: string[];
  requiredEvidenceIds: string[];
}

export interface CaseGroundTruth {
  culpritId: string;
  narrative: LocalizedText;
  facts: CaseFact[];
  characterStates: CharacterPrivateState[];
  contradictions: CaseContradiction[];
  resolutionCriteria: CaseResolutionCriteria;
}

/**
 * Дані, які можна безпечно віддавати гравцеві.
 * Прихована істина справи навмисно зберігається окремо в CaseGroundTruth.
 */
export interface CaseFile {
  summary: CaseSummary;
  metadata: CaseMetadata;
  people: CasePerson[];
  evidence: CaseEvidence[];
  evidenceUnlockRules: EvidenceUnlockRule[];
  interrogationTopics: InterrogationTopic[];
  interrogationEvidenceUnlocks: InterrogationEvidenceUnlock[];
  scenePoints: SceneExaminationPoint[];
  theoryMotiveOptions: TheoryMotiveOption[];
  locations: CaseLocation[];
  statements: WitnessStatement[];
  timeline: TimelineEvent[];
}
