/** WhyTbtSection — 왜 턱관절이 전신에 영향을 줄까요? (해부학 + 설명) */
import { ChevronDown } from "lucide-react";
import { anatomyConnections } from "../../../data/tbtData";

// TODO: 실제 해부학 일러스트로 교체 필요 — /public/images/redesign/tbt/anatomy.png
const ANATOMY_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/headdocimg.png";

export default function WhyTbtSection() {
  return (
    <section className="bg-[#FFFFFF] px-5 lg:px-8 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <h2 className="text-[20px] lg:text-[26px] font-extrabold text-[#2F2A26] text-center mb-10">
          왜 턱관절이 전신에 영향을 줄까요?
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* ── 좌측: 해부학 일러스트 + 라벨 ── */}
          <div className="w-full lg:flex-1 relative">
            <div className="flex items-start gap-4">
              {/* 일러스트 */}
              <div className="flex-1 relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[240px] mx-auto lg:mx-0 bg-[#EFE7DC]">
                {/* TODO: 실제 해부학 일러스트 교체 필요 — anatomy.png */}
                <img
                  src={ANATOMY_IMAGE}
                  alt="턱관절-두개골-경추 해부학 측면도"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* 워인 레드 턱관절 강조 효과 */}
                <div
                  className="absolute bottom-[40%] left-[45%] w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: "#9A856D",
                    boxShadow: "0 0 14px 6px rgba(139,42,31,0.4)",
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* 라벨 세로 배치 (데스크탑: 일러스트 우측, 모바일: 아래) */}
              <div className="hidden lg:flex flex-col justify-around h-full py-4 gap-5 min-h-[280px]">
                {anatomyConnections.map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    {/* 연결선 */}
                    <div className="w-6 h-px bg-[#9A856D]" />
                    <span className="bg-[#F8F3EA] text-[#9A856D] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D8CDBE] whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 모바일용 라벨 (하단 가로 배치) */}
            <div className="flex flex-wrap gap-2 justify-center mt-4 lg:hidden">
              {anatomyConnections.map((label) => (
                <span
                  key={label}
                  className="bg-[#F8F3EA] text-[#9A856D] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D8CDBE]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── 우측: 설명 텍스트 ── */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="text-[15px] text-[#2F2A26] leading-relaxed">
              턱관절은 두개골, 경추, 신경계와
              <br />
              긴밀하게 연결되어 있습니다.
            </p>
            <p className="text-[14px] text-[#756A60] leading-relaxed">
              균형이 무너지면 신경 전달 이상,
              <br />
              근육 긴장, 혈액 순환에 영향을 주어
              <br />
              전신에 다양한 증상이 나타납니다.
            </p>

            {/* 화살표 */}
            <div className="flex justify-center lg:justify-start">
              <ChevronDown size={24} color="#9A856D" strokeWidth={2} />
            </div>

            {/* 결론 박스 */}
            <div className="bg-[#EFE7DC] rounded-xl p-5 border-l-4" style={{ borderColor: "#9A856D" }}>
              <p className="text-[14px] text-[#2F2A26] leading-relaxed">
                턱관절은 단순한 관절이 아니라
                <br />
                <strong className="font-extrabold text-[#6A5542]">
                  몸 전체 균형의 중심입니다.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
