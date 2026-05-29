import { Helmet } from "react-helmet-async";
import TbtHero from "../../../components/program/tbt/TbtHero";
import TbtBenefitsBar from "../../../components/program/tbt/TbtBenefitsBar";
import WhyTbtSection from "../../../components/program/tbt/WhyTbtSection";
import TbtTreatmentList from "../../../components/program/tbt/TbtTreatmentList";
import IntegratedEffectBanner from "../../../components/program/tbt/IntegratedEffectBanner";
import ClinicalEffects from "../../../components/program/tbt/ClinicalEffects";
import TbtFinalMessage from "../../../components/program/tbt/TbtFinalMessage";
import QuickActionsTriple from "../../../components/program/tbt/QuickActionsTriple";

export default function TbtTherapy() {
  return (
    <>
      <Helmet>
        <title>턱관절 균형 요법 (TBT) | Beautiful 뷰티풀 암요양병원</title>
        <meta
          name="description"
          content="TBT(턱관절 균형 요법) — 턱관절 균형을 바로잡아 항암 중 나타나는 이명·통증·불면증·소화 문제를 함께 개선합니다. TBA + CBA + 추나요법으로 전신 균형을 회복합니다."
        />
      </Helmet>

      <div className="bg-[#F8F3EA] min-h-screen">
        {/* Section 1 — 히어로 (영상 모달 포함) */}
        <TbtHero />

        {/* Section 2 — 4가지 변화 + 다크 강조바 */}
        <TbtBenefitsBar />

        {/* Section 3 — 왜 턱관절이 전신에 영향을? */}
        <WhyTbtSection />

        {/* Section 4 — TBT 3단계 치료 */}
        <TbtTreatmentList />

        {/* Section 5 — 전신 균형 치료 강조 배너 */}
        <IntegratedEffectBanner />

        {/* Section 6 — 임상으로 검증된 효과 */}
        <ClinicalEffects />

        {/* Section 7 — 마무리 메시지 */}
        <TbtFinalMessage />

        {/* Section 8 — 3개 빠른 액션 */}
        <QuickActionsTriple />
      </div>
    </>
  );
}
