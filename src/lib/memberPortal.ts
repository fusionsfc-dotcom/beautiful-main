import { supabase } from "./supabase";

export type ConsultationRecord = {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  clinic: string;
  visit_type: "outpatient" | "inpatient";
  consult_method: "phone" | "kakao" | "visit";
  message: string | null;
  status: "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
  created_at: string;
};

export type PatientResultRecord = {
  id: string;
  user_id: string;
  test_type: string;
  doctor_name: string | null;
  test_date: string;
  summary: string | null;
  details: string[];
  file_url: string | null;
  created_at: string;
};

export type TreatmentReportRecord = {
  id: string;
  user_id: string;
  period_label: string;
  report_date: string;
  progress_percent: number;
  improvements: string[];
  next_steps: string | null;
  created_at: string;
};

const CONSULTATION_STATUS_LABEL: Record<ConsultationRecord["status"], string> = {
  pending: "접수 완료",
  contacted: "연락 완료",
  scheduled: "상담 예정",
  completed: "상담 완료",
  cancelled: "취소",
};

const VISIT_TYPE_LABEL = {
  outpatient: "외래 진료",
  inpatient: "입원 상담",
} as const;

const CONSULT_METHOD_LABEL = {
  phone: "전화",
  kakao: "카카오톡",
  visit: "방문",
} as const;

export function formatConsultationStatus(status: ConsultationRecord["status"]): string {
  return CONSULTATION_STATUS_LABEL[status] ?? status;
}

export function formatDateKo(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatTimeKo(iso: string): string {
  return new Date(iso).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isMissingTableError(message: string): boolean {
  return /does not exist|relation.*not found|42P01/i.test(message);
}

function normalizeDetails(details: unknown): string[] {
  if (Array.isArray(details)) {
    return details.map((d) => String(d));
  }
  return [];
}

export async function fetchMyConsultations(): Promise<ConsultationRecord[]> {
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ConsultationRecord[];
}

export async function fetchMyPatientResults(): Promise<PatientResultRecord[]> {
  const { data, error } = await supabase
    .from("patient_results")
    .select("*")
    .order("test_date", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => ({
    ...row,
    details: normalizeDetails(row.details),
  })) as PatientResultRecord[];
}

export async function fetchMyTreatmentReports(): Promise<TreatmentReportRecord[]> {
  const { data, error } = await supabase
    .from("treatment_reports")
    .select("*")
    .order("report_date", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => ({
    ...row,
    improvements: normalizeDetails(row.improvements),
  })) as TreatmentReportRecord[];
}

export function getConsultationDisplayMeta(c: ConsultationRecord) {
  return {
    visitLabel: VISIT_TYPE_LABEL[c.visit_type],
    methodLabel: CONSULT_METHOD_LABEL[c.consult_method],
    statusLabel: formatConsultationStatus(c.status),
    date: formatDateKo(c.created_at),
    time: formatTimeKo(c.created_at),
  };
}
