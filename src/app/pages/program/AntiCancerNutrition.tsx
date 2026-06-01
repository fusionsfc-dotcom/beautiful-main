import { Helmet } from "react-helmet-async";
import { Heart } from "lucide-react";
import NutritionHero from "../../../components/program/nutrition/NutritionHero";
import NutritionCoreValues from "../../../components/program/nutrition/NutritionCoreValues";
import GardenIngredientsBox from "../../../components/program/nutrition/GardenIngredientsBox";
import NutritionSpecialBox from "../../../components/program/nutrition/NutritionSpecialBox";
import HandwrittenReviewsSection from "../../../components/program/nutrition/HandwrittenReviewsSection";
import CompostProcessSection from "../../../components/program/nutrition/CompostProcessSection";
import QuickActionsTriple from "../../../components/program/tbt/QuickActionsTriple";

export default function AntiCancerNutrition() {
  return (
    <>
      <Helmet>
        <title>항암 식단 & 영양 | Beautiful 뷰티풀 암요양병원</title>
        <meta
          name="description"
          content="뷰티풀 한방병원은 자체 텃밭에서 직접 키운 유기농 식재료로 개인별 맞춤 항암 식단을 제공합니다. 한의사·영양사 협진 설계로 면역력을 높이고 체력을 회복합니다."
        />
      </Helmet>

      <div className="bg-[#F8F3EA] min-h-screen">
        {/* Section 1 — 히어로 */}
        <NutritionHero />

        {/* Section 2 — 4가지 핵심 가치 */}
        <NutritionCoreValues />

        {/* Section 3 — 2열 정보 박스 */}
        <section className="px-5 lg:px-8 py-4 pb-10 lg:pb-14">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GardenIngredientsBox />
            <NutritionSpecialBox />
          </div>
        </section>

        {/* Section 4 — 자필 후기 4장 */}
        <div className="bg-[#F8F3EA]">
          <HandwrittenReviewsSection />
        </div>

        {/* Section 5 — 퇴비 4단계 공정 */}
        <CompostProcessSection />

        {/* Section 6 — 다크 브라운 마무리 CTA */}
        <section className="px-5 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div
              className="rounded-2xl px-7 py-8 flex flex-col md:flex-row items-start md:items-center gap-5"
              style={{ background: "linear-gradient(135deg, #6A5542 0%, #9A856D 100%)" }}
            >
              <div className="w-12 h-12 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center">
                <Heart size={22} color="white" fill="rgba(255,255,255,0.3)" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[#9A856D] text-[13px] mb-1">
                  항암 치료 중 나타나는 다양한 증상
                </p>
                <p className="text-white font-extrabold text-[16px] lg:text-[18px] leading-snug">
                  전문적인 항암 식단으로 건강한 회복을 시작하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 — 3개 빠른 액션 */}
        <QuickActionsTriple />
      </div>
    </>
  );
}
