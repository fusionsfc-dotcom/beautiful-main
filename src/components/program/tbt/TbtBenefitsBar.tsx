/** TbtBenefitsBar — 4가지 변화 + 다크 강조바 */
import { CheckCircle, Leaf } from "lucide-react";
import { tbtBenefits, type TbtBenefit } from "../../../data/tbtData";

/* ── 아이콘 SVG (lucide에 없는 것은 인라인) ── */
function BenefitIcon({ icon }: { icon: TbtBenefit["icon"] }) {
  const cls = "mx-auto";
  const stroke = "#5B3A1F";

  if (icon === "ear") {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <path d="M6 9a6 6 0 1 1 12 0c0 2.2-1.2 3.9-2.8 5.2C14 15.3 13.5 16 13.5 17" />
        <path d="M13.5 17v.5a2 2 0 0 1-4 0V17" />
        <circle cx="10.5" cy="15.5" r=".5" fill={stroke} stroke="none" />
      </svg>
    );
  }
  if (icon === "shoulder") {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <circle cx="12" cy="6" r="3" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M8 20v-2c0-1.7 1.8-3 4-3s4 1.3 4 3v2" />
      </svg>
    );
  }
  if (icon === "moon-star") {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
        <path d="M19 3v4" />
        <path d="M21 5h-4" />
      </svg>
    );
  }
  // stomach — 위장 커스텀 SVG
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <path d="M6 4h2a4 4 0 0 1 4 4v1a4 4 0 0 0 4 4h2" />
      <path d="M18 13a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4V8" />
      <path d="M8 4c0 1.1-.9 2-2 2" />
    </svg>
  );
}

export default function TbtBenefitsBar() {
  return (
    <section className="px-5 lg:px-8 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        {/* 크림 카드 */}
        <div className="bg-[#FBF5E9] rounded-2xl px-6 pt-8 pb-6">
          {/* 섹션 타이틀 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf size={14} color="#C9A567" strokeWidth={1.8} className="rotate-180" />
            <h2 className="text-[17px] lg:text-[20px] font-extrabold text-[#2A1F18] text-center">
              턱관절 균형을 잡으면 이런 변화가 나타납니다
            </h2>
            <Leaf size={14} color="#C9A567" strokeWidth={1.8} />
          </div>

          {/* 4개 항목 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tbtBenefits.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 text-center">
                <BenefitIcon icon={item.icon} />
                <p className="text-[14px] font-extrabold text-[#2A1F18] leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* 다크 강조바 */}
          <div className="bg-[#3D2817] rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
              <CheckCircle size={18} color="white" strokeWidth={2.5} />
            </div>
            <p className="text-white text-[13px] lg:text-[14px] leading-relaxed">
              턱관절 균형을 통해 신경과 순환이 안정되며 전신 증상이 함께 완화됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
