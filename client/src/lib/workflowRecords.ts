export type WorkflowRecordKind = "decision" | "event" | "application" | "introduction";

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
