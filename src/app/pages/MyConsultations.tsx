import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Calendar, Clock, MessageSquare, Phone } from "lucide-react";

const mockConsultations = [
  {
    id: 1,
    date: "2026.02.25",
    time: "14:00",
    doctor: "김한의 원장",
    type: "초진 상담",
    status: "완료",
    notes: "암 치료 관련 상담 진행",
  },
  {
    id: 2,
    date: "2026.02.20",
    time: "10:30",
    doctor: "이한의 원장",
    type: "재진 상담",
    status: "완료",
    notes: "통증 개선 상태 점검",
  },
  {
    id: 3,
    date: "2026.03.05",
    time: "15:00",
    doctor: "김한의 원장",
    type: "정기 상담",
    status: "예정",
    notes: "-",
  },
];

export default function MyConsultations() {
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
            내 상담 내역
          </h1>
          <p className="text-gray-600">지금까지의 상담 기록을 확인하세요</p>
        </div>

        <div className="space-y-4">
          {mockConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${
                      consultation.status === "완료"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {consultation.status}
                  </span>
                  <h3 className="font-semibold text-[#1a2847] mb-1">
                    {consultation.type}
                  </h3>
                  <p className="text-sm text-gray-600">{consultation.doctor}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{consultation.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{consultation.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>{consultation.notes}</span>
                </div>
              </div>

              {consultation.status === "예정" && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <button className="flex-1 bg-[#1a2847] text-white py-2 rounded-md text-sm hover:bg-[#243554] transition-colors">
                    상담 변경
                  </button>
                  <button className="px-4 border border-gray-300 text-gray-600 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/reservation")}
            className="bg-[#1a2847] text-white px-6 py-2.5 rounded-md hover:bg-[#243554] transition-colors"
          >
            새 상담 예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
