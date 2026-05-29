import { Leaf } from "lucide-react";
import SEOHead from "../../../components/seo/SEOHead";
import RehabHero from "../../../components/program/rehab/RehabHero";
import ProgramCard from "../../../components/program/rehab/ProgramCard";
import ConsultCallout from "../../../components/program/rehab/ConsultCallout";
import TrustMessageSection from "../../../components/program/rehab/TrustMessageSection";
import FinalCTASection from "../../../components/program/rehab/FinalCTASection";
import { rehabPrograms } from "../../../data/rehabPrograms";

export default function RehabExercise() {
  return (
    <>
      <SEOHead
        title="운동 재활 치료 | 뷰티풀한방병원"
        description="항암 치료를 버티는 힘, 운동에서 만들어집니다. 트램폴린 재활, 항암 필라테스, 1:1 맞춤 PT, 매직테니스 등 암 환자를 위한 전문 운동 재활 프로그램."
        keywords="암환자운동재활,항암필라테스,트램폴린재활,암재활운동,뷰티풀한방병원,운동치료"
        ogUrl="https://www.btful.co.kr/program/rehab"
        canonical="https://www.btful.co.kr/program/rehab"
      />

      {/* 하단 고정 액션바 높이만큼 여백 */}
      <div
        className="bg-[#F8F3EA] min-h-screen"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Section 1: 히어로 */}
        <RehabHero />

        {/* 구분선 */}
        <div className="h-px bg-[#D8CDBE] mx-5 lg:mx-8" />

        {/* Section 2: 운동 프로그램 안내 */}
        <section className="bg-[#F8F3EA] py-12 lg:py-16 px-5 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* 섹션 타이틀 */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Leaf size={18} color="#9A856D" strokeWidth={1.5} />
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">
                운동 프로그램 안내
              </h2>
              <Leaf
                size={18}
                color="#9A856D"
                strokeWidth={1.5}
                className="scale-x-[-1]"
              />
            </div>

            {/* 4개 카드 목록 */}
            <div className="flex flex-col gap-5">
              {rehabPrograms.map((program) => (
                <ProgramCard key={program.number} program={program} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: 중간 상담 유도 */}
        <ConsultCallout />

        {/* Section 4: 신뢰 메시지 3컬럼 */}
        <TrustMessageSection />

        {/* Section 5: 마무리 CTA */}
        <FinalCTASection />
      </div>
    </>
  );
}
