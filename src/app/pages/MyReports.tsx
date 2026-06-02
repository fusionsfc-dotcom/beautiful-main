import { useEffect, useState } from "react";
import { Calendar, Activity, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import RequireAuth from "../../components/auth/RequireAuth";
import SEOHead from "../../components/seo/SEOHead";
import {
  TreatmentReportRecord,
  fetchMyTreatmentReports,
  formatDateKo,
  isMissingTableError,
} from "../../lib/memberPortal";

export default function MyReports() {
  const [items, setItems] = useState<TreatmentReportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupNeeded, setSetupNeeded] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setSetupNeeded(false);
      setItems(await fetchMyTreatmentReports());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "";
      if (isMissingTableError(message)) {
        setSetupNeeded(true);
      } else {
        console.error("치료 리포트 로드 실패:", error);
        toast.error("치료 경과 리포트를 불러오지 못했습니다");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-[100dvh] bg-white py-8 px-4">
        <SEOHead
          title="치료 경과 리포트 | 뷰티풀한방병원"
          description="뷰티풀한방병원 치료 경과 리포트를 확인합니다."
          noindex
        />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#2F2A26] mb-2">
              치료 경과 리포트
            </h1>
            <p className="text-[#756A60]">치료 진행 상황과 회복 경과를 확인하세요</p>
          </div>

          {loading && <p className="text-center py-16 text-[#9A856D]">불러오는 중...</p>}

          {setupNeeded && (
            <div className="rounded-2xl border border-[#D8CDBE] bg-[#F8F3EA] p-8 text-center text-[#756A60]">
              <p>치료 경과 리포트 기능을 사용하려면 DB 설정이 필요합니다.</p>
              <p className="text-sm mt-2">scripts/member-portal-tables.sql</p>
            </div>
          )}

          {!loading && !setupNeeded && items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8CDBE] p-12 text-center text-[#756A60]">
              <p>등록된 치료 경과 리포트가 없습니다.</p>
              <p className="text-sm mt-2">입원·치료 중 담당 의료진이 리포트를 등록하면 표시됩니다.</p>
            </div>
          )}

          {!loading && !setupNeeded && items.length > 0 && (
            <div className="space-y-4">
              {items.map((report) => (
                <article
                  key={report.id}
                  className="bg-white border border-[#D8CDBE] rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-[#9A856D]" />
                        <h3 className="font-semibold text-[#2F2A26]">
                          {report.period_label} 경과 리포트
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#9A856D]">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateKo(report.report_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#2F2A26]">전체 진행도</span>
                      <span className="text-sm font-semibold text-[#9A856D]">
                        {report.progress_percent}%
                      </span>
                    </div>
                    <div className="w-full bg-[#EFE7DC] rounded-full h-2.5">
                      <div
                        className="bg-[#9A856D] h-2.5 rounded-full transition-all"
                        style={{ width: `${report.progress_percent}%` }}
                      />
                    </div>
                  </div>

                  {report.improvements.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#2F2A26] mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        개선 사항
                      </p>
                      <ul className="space-y-1">
                        {report.improvements.map((item, idx) => (
                          <li key={idx} className="text-sm text-[#756A60] flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {report.next_steps && (
                    <div className="bg-[#F8F3EA] rounded-xl p-4">
                      <p className="text-sm font-medium text-[#2F2A26] mb-1">다음 치료 계획</p>
                      <p className="text-sm text-[#756A60] whitespace-pre-wrap">
                        {report.next_steps}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
