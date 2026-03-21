import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { TrendingUp, Calendar, Activity, CheckCircle } from "lucide-react";

const mockReports = [
  {
    id: 1,
    date: "2026.02.28",
    period: "2주차",
    progress: 75,
    improvements: [
      "통증 감소: 30%",
      "수면의 질 개선",
      "식욕 회복",
    ],
    nextSteps: "침술 치료 주 3회 지속",
  },
  {
    id: 2,
    date: "2026.02.14",
    period: "1주차",
    progress: 50,
    improvements: [
      "초기 증상 완화 시작",
      "치료 적응 양호",
    ],
    nextSteps: "한약 복용 및 침술 병행",
  },
];

export default function MyReports() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-[100dvh] bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#1a2847] mb-2">
            치료 경과 리포트
          </h1>
          <p className="text-gray-600">치료 진행 상황을 확인하세요</p>
        </div>

        <div className="space-y-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-[#1a2847]" />
                    <h3 className="font-semibold text-[#1a2847]">
                      {report.period} 경과 리포트
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    전체 진행도
                  </span>
                  <span className="text-sm font-semibold text-[#1a2847]">
                    {report.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#1a2847] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${report.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Improvements */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-gray-700">주요 개선 사항</p>
                </div>
                <ul className="space-y-2">
                  {report.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-md p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  다음 단계 치료 계획
                </p>
                <p className="text-sm text-gray-600">{report.nextSteps}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#f5f6f8] rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            궁금한 점이 있으신가요?
          </p>
          <button
            onClick={() => navigate("/reservation")}
            className="bg-[#1a2847] text-white px-6 py-2.5 rounded-md hover:bg-[#243554] transition-colors"
          >
            상담 예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
