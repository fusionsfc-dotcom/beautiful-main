import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";
import RequireAuth from "../../components/auth/RequireAuth";
import SEOHead from "../../components/seo/SEOHead";
import {
  ConsultationRecord,
  fetchMyConsultations,
  getConsultationDisplayMeta,
  isMissingTableError,
} from "../../lib/memberPortal";

export default function MyConsultations() {
  const [items, setItems] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupNeeded, setSetupNeeded] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setSetupNeeded(false);
      const data = await fetchMyConsultations();
      setItems(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "";
      if (isMissingTableError(message)) {
        setSetupNeeded(true);
      } else {
        console.error("상담 내역 로드 실패:", error);
        toast.error("상담 내역을 불러오지 못했습니다");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-[100dvh] bg-white py-8 px-4">
        <SEOHead
          title="내 상담 내역 | 뷰티풀한방병원"
          description="뷰티풀한방병원 상담 신청 내역을 확인합니다."
          noindex
        />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-[#2F2A26] mb-2">
                내 상담 내역
              </h1>
              <p className="text-[#756A60]">로그인 계정으로 신청한 상담 기록입니다</p>
            </div>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 bg-[#9A856D] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#7C654F] transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 상담 신청
            </Link>
          </div>

          {loading && (
            <p className="text-center py-16 text-[#9A856D]">불러오는 중...</p>
          )}

          {setupNeeded && (
            <div className="rounded-2xl border border-[#D8CDBE] bg-[#F8F3EA] p-8 text-center text-[#756A60]">
              <p className="mb-2">회원 상담 내역 기능을 사용하려면 데이터베이스 설정이 필요합니다.</p>
              <p className="text-sm">관리자에게 scripts/member-portal-tables.sql 실행을 요청해 주세요.</p>
            </div>
          )}

          {!loading && !setupNeeded && items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8CDBE] p-12 text-center">
              <p className="text-[#756A60] mb-6">아직 등록된 상담 신청이 없습니다.</p>
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 bg-[#8BC31F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#75A915] transition-colors"
              >
                상담·예약 신청하기
              </Link>
            </div>
          )}

          {!loading && !setupNeeded && items.length > 0 && (
            <div className="space-y-4">
              {items.map((consultation) => {
                const meta = getConsultationDisplayMeta(consultation);
                const isPending = ["pending", "contacted", "scheduled"].includes(
                  consultation.status,
                );
                return (
                  <article
                    key={consultation.id}
                    className="bg-white border border-[#D8CDBE] rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${
                            consultation.status === "completed"
                              ? "bg-green-50 text-green-700"
                              : consultation.status === "cancelled"
                                ? "bg-red-50 text-red-600"
                                : "bg-[#F5EFE6] text-[#7C654F]"
                          }`}
                        >
                          {meta.statusLabel}
                        </span>
                        <h3 className="font-semibold text-[#2F2A26] mb-1">
                          {consultation.clinic}
                        </h3>
                        <p className="text-sm text-[#756A60]">
                          {meta.visitLabel} · {meta.methodLabel}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-[#756A60]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#9A856D]" />
                        <span>
                          신청일 {meta.date} {meta.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#9A856D]" />
                        <span>연락처 {consultation.phone}</span>
                      </div>
                      {consultation.message && (
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-[#9A856D] mt-0.5 shrink-0" />
                          <span className="whitespace-pre-wrap">{consultation.message}</span>
                        </div>
                      )}
                    </div>

                    {isPending && (
                      <p className="mt-4 pt-4 border-t border-[#EFE7DC] text-xs text-[#9A856D]">
                        담당자가 영업일 기준 24시간 내 연락드립니다.
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
