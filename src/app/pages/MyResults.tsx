import { useEffect, useState } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import { toast } from "sonner";
import RequireAuth from "../../components/auth/RequireAuth";
import SEOHead from "../../components/seo/SEOHead";
import {
  PatientResultRecord,
  fetchMyPatientResults,
  formatDateKo,
  isMissingTableError,
} from "../../lib/memberPortal";

export default function MyResults() {
  const [items, setItems] = useState<PatientResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupNeeded, setSetupNeeded] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setSetupNeeded(false);
      setItems(await fetchMyPatientResults());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "";
      if (isMissingTableError(message)) {
        setSetupNeeded(true);
      } else {
        console.error("검사 결과 로드 실패:", error);
        toast.error("검사 결과를 불러오지 못했습니다");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-[100dvh] bg-white py-8 px-4">
        <SEOHead
          title="내 검사 결과 | 뷰티풀한방병원"
          description="뷰티풀한방병원 검사 결과를 확인합니다."
          noindex
        />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#2F2A26] mb-2">
              내 검사 결과
            </h1>
            <p className="text-[#756A60]">병원에서 등록한 나의 검사 결과입니다</p>
          </div>

          {loading && <p className="text-center py-16 text-[#9A856D]">불러오는 중...</p>}

          {setupNeeded && (
            <div className="rounded-2xl border border-[#D8CDBE] bg-[#F8F3EA] p-8 text-center text-[#756A60]">
              <p>검사 결과 조회 기능을 사용하려면 DB 설정이 필요합니다.</p>
              <p className="text-sm mt-2">scripts/member-portal-tables.sql</p>
            </div>
          )}

          {!loading && !setupNeeded && items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8CDBE] p-12 text-center text-[#756A60]">
              <p>등록된 검사 결과가 없습니다.</p>
              <p className="text-sm mt-2">입원·외래 진료 후 결과가 등록되면 이곳에 표시됩니다.</p>
            </div>
          )}

          {!loading && !setupNeeded && items.length > 0 && (
            <div className="space-y-4">
              {items.map((result) => (
                <article
                  key={result.id}
                  className="bg-white border border-[#D8CDBE] rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-[#9A856D]" />
                        <h3 className="font-semibold text-[#2F2A26]">{result.test_type}</h3>
                      </div>
                      {result.doctor_name && (
                        <p className="text-sm text-[#756A60] mb-1">담당 {result.doctor_name}</p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-[#9A856D]">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateKo(result.test_date)}</span>
                      </div>
                    </div>
                    {result.file_url && (
                      <a
                        href={result.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#6A5542] hover:bg-[#F8F3EA] rounded-lg transition-colors"
                        title="결과 파일 다운로드"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {result.summary && (
                    <div className="bg-green-50 rounded-xl p-4 mb-4">
                      <p className="text-sm font-medium text-green-800">
                        종합 소견: {result.summary}
                      </p>
                    </div>
                  )}

                  {result.details.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#2F2A26]">상세 결과</p>
                      <ul className="space-y-1">
                        {result.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-[#756A60] flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#9A856D] rounded-full shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
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
