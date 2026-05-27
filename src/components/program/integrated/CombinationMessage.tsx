import { Heart, Phone } from "lucide-react";

const TEL = "tel:031-966-6677";

export default function CombinationMessage() {
  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#F5EEE0] rounded-2xl px-6 py-7 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex-shrink-0 flex items-center justify-center">
            <Heart size={22} color="#8B2A1F" fill="#8B2A1F" strokeWidth={0} />
          </div>

          {/* 텍스트 */}
          <div className="flex-1 min-w-0">
            <p className="text-[16px] lg:text-[17px] font-extrabold text-[#2A1F18] leading-snug mb-1">
              치료는 하나가 아니라 &lsquo;조합&rsquo;일 때 결과가 달라집니다.
            </p>
            <p className="text-[13px] text-[#6B5547] leading-relaxed">
              환자의 상태에 맞춰 최적의 치료를 전략적으로 설계합니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <a
            href={TEL}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#3D2817] text-white text-[13px] font-bold px-5 py-3 rounded-full hover:bg-[#5B3A1F] transition-colors"
          >
            <Phone size={14} />
            전화 상담
          </a>
        </div>
      </div>
    </section>
  );
}
