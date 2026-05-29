import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { FileText, Download, Calendar } from "lucide-react";

const mockResults = [
  {
    id: 1,
    date: "2026.02.22",
    type: "혈액 검사",
    doctor: "김한의 원장",
    summary: "정상 범위 내",
    details: ["백혈구: 정상", "적혈구: 정상", "혈소판: 정상"],
  },
  {
    id: 2,
    date: "2026.02.15",
    type: "맥진 검사",
    doctor: "이한의 원장",
    summary: "기혈 순환 양호",
    details: ["맥박: 안정적", "기운: 보통", "순환: 양호"],
  },
];

export default function MyResults() {
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#2F2A26] mb-2">
            내 검사 결과
          </h1>
          <p className="text-[#756A60]">최근 검사 결과를 확인하세요</p>
        </div>

        <div className="space-y-4">
          {mockResults.map((result) => (
            <div
              key={result.id}
              className="bg-white border border-[#D8CDBE] rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-[#2F2A26]" />
                    <h3 className="font-semibold text-[#2F2A26]">
                      {result.type}
                    </h3>
                  </div>
                  <p className="text-sm text-[#756A60] mb-1">{result.doctor}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{result.date}</span>
                  </div>
                </div>
                <button className="p-2 text-[#2F2A26] hover:bg-[#F8F3EA] rounded-md transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-green-50 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-green-800">
                  종합 소견: {result.summary}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-[#2F2A26]">상세 결과</p>
                <ul className="space-y-1">
                  {result.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-[#756A60] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#6A5542] rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
