export type WorkflowRecordKind = "decision" | "event" | "application" | "introduction" | "note";

export type CustomerEvidence = {
  buyer: string;
  lastEvent: string;
  trigger: string;
  workaround: string;
  quote: string;
  success: string;
  action: string;
  actionAr: string;
  threshold: string;
  capturedAt: string;
};

export type MarketEvidence = {
  segment: string;
  situation: string;
  workaround: string;
  reach: string;
  evidenceSource: string;
  evidenceSourceAr: string;
  evidenceCount: number;
  researchMode: "discovery" | "test";
  nextTest: string;
  threshold: string;
  capturedAt: string;
};

export type OperatingPrinciple = {
  month: string;
  rule: string;
  scope: string;
  applyNext: string;
  createdAt: string;
};

export type ResearchCadencePlan = {
  primaryBetWeek: string;
  question: string;
  buyer: string;
  dueDate: string;
  responseRule: string;
  ruleSourceId?: string;
  ruleClaim?: string;
  ruleScope?: string;
  ruleNextEvidenceMove?: string;
  createdAt: string;
};

export type KnowledgeGuidance = {
  claim: string;
  scope: string;
  nextEvidenceMove: string;
  createdAt: string;
};

export type EventFollowUpDraft = {
  recipientContext: string;
  nextMove: string;
  dueDate: string;
  draft: string;
  createdAt: string;
  copiedAt?: string;
};

export type EventPreparationChecklist = {
  question: string;
  decisionSourceReviewed: boolean;
  questionReviewed: boolean;
  observationCaptureReady: boolean;
  updatedAt: string;
};

export type FounderEvidenceReading = {
  eventSourceId: string;
  decisionSourceId: string;
  interpretation: string;
  nextQuestion: string;
  createdAt: string;
};

export type FounderReadingReviewAgenda = {
  founderReadingId: string;
  createdAt: string;
};

export type FounderReadingRevisit = {
  founderReadingId: string;
  reviewAgendaId: string;
  remainingUncertainty: string;
  revisitedAt: string;
};

export type WorkflowRecord = {
  id: string;
  kind: WorkflowRecordKind;
  title: string;
  titleAr: string;
  href: string;
  status: "saved" | "submitted" | "registered" | "introduced" | "completed";
  owner?: string;
  ownerAr?: string;
  nextAction?: string;
  nextActionAr?: string;
  reviewDate?: string;
  reviewDateAr?: string;
  reviewDue?: string;
  evidence?: string;
  weeklyReflection?: string;
  weeklyReflectionAt?: string;
  outcome?: "keep" | "change" | "stop";
  outcomeAt?: string;
  linkedDecisionId?: string;
  introductionReflection?: string;
  introductionReflectionAt?: string;
  followUpDraft?: string;
  followUpCopiedAt?: string;
  outcomeCheckDue?: string;
  outcomeCheckCompletedAt?: string;
  introductionOutcome?: "next-step" | "useful-learning" | "not-a-fit";
  introductionOutcomeNote?: string;
  eventOutcome?: "decision-moved" | "useful-connection" | "useful-learning" | "no-useful-outcome";
  eventOutcomeNote?: string;
  eventOutcomeAt?: string;
  customerEvidence?: CustomerEvidence;
  marketEvidence?: MarketEvidence;
  operatingPrinciple?: OperatingPrinciple;
  researchCadence?: ResearchCadencePlan;
  reusedFromDecisionId?: string;
  reusedFromRevisitId?: string;
  recoveredFromEventId?: string;
  knowledgeGuidance?: KnowledgeGuidance;
  eventFollowUp?: EventFollowUpDraft;
  eventPreparation?: EventPreparationChecklist;
  founderEvidenceReading?: FounderEvidenceReading;
  founderReadingReviewAgenda?: FounderReadingReviewAgenda;
  founderReadingRevisit?: FounderReadingRevisit;
  updatedAt: string;
};

const WORKFLOW_KEY = "asaasi-workflow-records";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getWorkflowRecords(): WorkflowRecord[] {
  if (!canUseStorage()) return [];
  try {
    const stored = window.localStorage.getItem(WORKFLOW_KEY);
    return stored ? JSON.parse(stored) as WorkflowRecord[] : [];
  } catch {
    return [];
  }
}

export function getCustomerEvidenceRecords(records = getWorkflowRecords()): WorkflowRecord[] {
  return records.filter((record) => Boolean(record.customerEvidence));
}

export function getMarketEvidenceRecords(records = getWorkflowRecords()): WorkflowRecord[] {
  return records.filter((record) => Boolean(record.marketEvidence));
}

export function upsertWorkflowRecord(record: Omit<WorkflowRecord, "updatedAt">) {
  if (!canUseStorage()) return;
  const existing = getWorkflowRecords().filter((item) => item.id !== record.id);
  const next = [{ ...record, updatedAt: new Date().toISOString() }, ...existing];
  window.localStorage.setItem(WORKFLOW_KEY, JSON.stringify(next));
}

export function removeWorkflowRecord(id: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(WORKFLOW_KEY, JSON.stringify(getWorkflowRecords().filter((item) => item.id !== id)));
}
