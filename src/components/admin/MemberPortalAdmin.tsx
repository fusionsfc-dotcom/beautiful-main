import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase, Profile } from "../../lib/supabase";
import { formatConsultationStatus, getConsultationDisplayMeta } from "../../lib/memberPortal";
import type { ConsultationRecord } from "../../lib/memberPortal";

export default function MemberPortalAdmin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [resultForm, setResultForm] = useState({
    test_type: "",
    doctor_name: "",
    test_date: new Date().toISOString().slice(0, 10),
    summary: "",
    details: "",
    file_url: "",
  });

  const [reportForm, setReportForm] = useState({
    period_label: "",
    report_date: new Date().toISOString().slice(0, 10),
    progress_percent: "50",
    improvements: "",
    next_steps: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const [profilesRes, consultRes] = await Promise.all([
        supabase.from("profiles").select("id, email, role, created_at").order("created_at", { ascending: false }),
        supabase.from("consultations").select("*").order("created_at", { ascending: false }).limit(50),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      setProfiles((profilesRes.data ?? []) as Profile[]);
      setConsultations((consultRes.data ?? []) as ConsultationRecord[]);
      if (!selectedUserId && profilesRes.data?.[0]) {
        setSelectedUserId(profilesRes.data[0].id);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "데이터 로드 실패";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateConsultationStatus = async (id: string, status: ConsultationRecord["status"]) => {
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("상담 상태가 변경되었습니다");
    load();
  };

  const submitResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error("회원을 선택해 주세요");
      return;
    }
    const details = resultForm.details
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const { error } = await supabase.from("patient_results").insert({
      user_id: selectedUserId,
      test_type: resultForm.test_type,
      doctor_name: resultForm.doctor_name || null,
      test_date: resultForm.test_date,
      summary: resultForm.summary || null,
      details,
      file_url: resultForm.file_url || null,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("검사 결과가 등록되었습니다");
    setResultForm({
      test_type: "",
      doctor_name: "",
      test_date: new Date().toISOString().slice(0, 10),
      summary: "",
      details: "",
      file_url: "",
    });
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error("회원을 선택해 주세요");
      return;
    }
    const improvements = reportForm.improvements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const { error } = await supabase.from("treatment_reports").insert({
      user_id: selectedUserId,
      period_label: reportForm.period_label,
      report_date: reportForm.report_date,
      progress_percent: Number(reportForm.progress_percent) || 0,
      improvements,
      next_steps: reportForm.next_steps || null,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("치료 경과 리포트가 등록되었습니다");
    setReportForm({
      period_label: "",
      report_date: new Date().toISOString().slice(0, 10),
      progress_percent: "50",
      improvements: "",
      next_steps: "",
    });
  };

  if (loading) {
    return <p className="text-[#9A856D] py-8 text-center">회원 포털 데이터 로드 중...</p>;
  }

  return (
    <div className="mt-12 space-y-10 border-t border-[#D8CDBE] pt-10">
      <div>
        <h2 className="text-xl text-[#6A5542] mb-2">회원 포털 관리</h2>
        <p className="text-sm text-[#756A60]">
          상담 신청 상태 변경 · 회원별 검사 결과 · 치료 경과 리포트 등록
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6A5542] mb-2">대상 회원</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#D8CDBE] rounded-md"
        >
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.email} ({p.role})
            </option>
          ))}
        </select>
      </div>

      <section>
        <h3 className="font-semibold text-[#6A5542] mb-3">상담 신청 내역</h3>
        {consultations.length === 0 ? (
          <p className="text-sm text-[#756A60]">상담 신청이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {consultations.map((c) => {
              const meta = getConsultationDisplayMeta(c);
              return (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center gap-3 border border-[#D8CDBE] rounded-lg p-4"
                >
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium text-[#2F2A26]">
                      {c.name} · {c.clinic}
                    </p>
                    <p className="text-xs text-[#756A60]">
                      {meta.date} · {c.phone}
                      {c.user_id ? "" : " (비회원)"}
                    </p>
                  </div>
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateConsultationStatus(c.id, e.target.value as ConsultationRecord["status"])
                    }
                    className="px-3 py-1.5 border border-[#D8CDBE] rounded-md text-sm"
                  >
                    {(["pending", "contacted", "scheduled", "completed", "cancelled"] as const).map(
                      (s) => (
                        <option key={s} value={s}>
                          {formatConsultationStatus(s)}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={submitResult} className="border border-[#D8CDBE] rounded-lg p-5 space-y-3">
          <h3 className="font-semibold text-[#6A5542]">검사 결과 등록</h3>
          <input
            required
            placeholder="검사 종류 (예: 혈액 검사)"
            value={resultForm.test_type}
            onChange={(e) => setResultForm({ ...resultForm, test_type: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            placeholder="담당 의료진"
            value={resultForm.doctor_name}
            onChange={(e) => setResultForm({ ...resultForm, doctor_name: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            type="date"
            value={resultForm.test_date}
            onChange={(e) => setResultForm({ ...resultForm, test_date: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            placeholder="종합 소견"
            value={resultForm.summary}
            onChange={(e) => setResultForm({ ...resultForm, summary: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <textarea
            placeholder="상세 결과 (한 줄에 하나)"
            value={resultForm.details}
            onChange={(e) => setResultForm({ ...resultForm, details: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            placeholder="결과 파일 URL (선택)"
            value={resultForm.file_url}
            onChange={(e) => setResultForm({ ...resultForm, file_url: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-[#9A856D] text-white rounded-md text-sm">
            검사 결과 저장
          </button>
        </form>

        <form onSubmit={submitReport} className="border border-[#D8CDBE] rounded-lg p-5 space-y-3">
          <h3 className="font-semibold text-[#6A5542]">치료 경과 리포트 등록</h3>
          <input
            required
            placeholder="기간 (예: 2주차)"
            value={reportForm.period_label}
            onChange={(e) => setReportForm({ ...reportForm, period_label: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            type="date"
            value={reportForm.report_date}
            onChange={(e) => setReportForm({ ...reportForm, report_date: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <input
            type="number"
            min={0}
            max={100}
            placeholder="진행도 %"
            value={reportForm.progress_percent}
            onChange={(e) => setReportForm({ ...reportForm, progress_percent: e.target.value })}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <textarea
            placeholder="개선 사항 (한 줄에 하나)"
            value={reportForm.improvements}
            onChange={(e) => setReportForm({ ...reportForm, improvements: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <textarea
            placeholder="다음 치료 계획"
            value={reportForm.next_steps}
            onChange={(e) => setReportForm({ ...reportForm, next_steps: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-[#D8CDBE] rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-[#9A856D] text-white rounded-md text-sm">
            리포트 저장
          </button>
        </form>
      </section>
    </div>
  );
}
