import { Heart } from "lucide-react";

export default function CombinationMessage() {
  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#EFE7DC] rounded-2xl px-6 py-7 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex-shrink-0 flex items-center justify-center">
            <Heart size={22} color="#9A856D" fill="#9A856D" strokeWidth={0} />
          </div>

          {/* 텍스트 */}
          <div className="flex-1 min-w-0">
            <p className="text-[16px] lg:text-[17px] font-extrabold text-[#2F2A26] leading-snug mb-1">
              치료는 하나가 아니라 &lsquo;조합&rsquo;일 때 결과가 달라집니다.
            </p>
            <p className="text-[13px] text-[#756A60] leading-relaxed">
              환자의 상태에 맞춰 최적의 치료를 전략적으로 설계합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
