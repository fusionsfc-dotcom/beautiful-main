/** 통합 맞춤 치료 시스템 — 중앙 정렬 섹션 타이틀 */
import { Leaf } from "lucide-react";

export default function SystemSectionHeader() {
  return (
    <section className="py-10 lg:py-14 px-5 text-center bg-[#FAF6EE]">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Leaf size={16} color="#C9A567" strokeWidth={1.8} className="rotate-180" />
        <span className="text-[11px] tracking-widest text-[#6B5547] uppercase font-medium">
          3-Way Collaboration
        </span>
        <Leaf size={16} color="#C9A567" strokeWidth={1.8} />
      </div>
      <h2 className="text-[24px] lg:text-[30px] font-extrabold text-[#3D2817] mb-3">
        통합 맞춤 치료 시스템
      </h2>
      <p className="text-[14px] text-[#6B5547] max-w-lg mx-auto leading-relaxed">
        개인의 상태, 체질, 병기, 치료 목표에 맞춰
        <br className="hidden sm:block" />
        최적의 치료를 조합합니다.
      </p>
    </section>
  );
}
