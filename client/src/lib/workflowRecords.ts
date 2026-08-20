export type WorkflowRecordKind = "decision" | "event" | "application";

export type WorkflowRecord = {
  id: string;
  kind: WorkflowRecordKind;
  title: string;
  titleAr: string;
  href: string;
  status: "saved" | "submitted" | "registered";
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
