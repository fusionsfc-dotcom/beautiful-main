import { Check } from "lucide-react";

const LEFT_ITEMS = [
  "체력이 떨어지면 치료 지속이 어렵고",
  "근육이 줄어들면 회복이 늦어지며",
  "활동이 줄어들면 삶의 질이 떨어집니다.",
];

const RIGHT_ITEMS = [
  "환자 상태에 맞는 안전한 운동을 제공합니다.",
  "전문 운동 지도사가 함께합니다.",
  "즐겁고 지속 가능한 운동을 만듭니다.",
];

export default function TrustMessageSection() {
  return (
    <section className="bg-[#F8F3EA] py-14 lg:py-20 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <div className="text-center mb-10">
          <h2 className="text-[24px] lg:text-[30px] font-extrabold text-[#2F2A26] leading-snug">
            혼자가 아닙니다.
          </h2>
          <p className="text-[24px] lg:text-[30px] font-extrabold text-[#2F2A26] leading-snug">
            전문 운동 치료사가 함께합니다.
          </p>
        </div>

        {/* 3컬럼 (모바일: 세로 적층) */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* 컬럼 1: 왜 운동이 중요할까요? */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-[#D8CDBE]">
            <h3 className="text-[15px] font-bold text-[#6A5542] mb-4 pb-3 border-b border-[#D8CDBE]">
              왜 운동이 중요할까요?
            </h3>
            <ul className="space-y-3">
              {LEFT_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EFE7DC] flex items-center justify-center mt-0.5">
                    <Check size={11} color="#9A856D" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] text-[#2F2A26] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 컬럼 2: 중앙 강조 박스 */}
          <div className="flex-1 bg-[#EFE7DC] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            {/* 하트 손 아이콘 */}
            <div className="w-12 h-12 rounded-full bg-[#D8CDBE] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 2.4 1.2 4.5 3 6l1 1h9l1-1c1.8-1.5 3-3.6 3-6v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <p className="text-[16px] font-extrabold text-[#2F2A26] leading-snug">
              운동은 단순한 활동이 아니라
              <br />
              치료를 이어가기 위한
              <br />
              <span className="text-[#9A856D]">가장 강력한 힘입니다.</span>
            </p>
          </div>

          {/* 컬럼 3: 우리의 약속 */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-[#D8CDBE]">
            <h3 className="text-[15px] font-bold text-[#6A5542] mb-4 pb-3 border-b border-[#D8CDBE]">
              우리의 약속
            </h3>
            <ul className="space-y-3">
              {RIGHT_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EFE7DC] flex items-center justify-center mt-0.5">
                    <Check size={11} color="#9A856D" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] text-[#2F2A26] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
