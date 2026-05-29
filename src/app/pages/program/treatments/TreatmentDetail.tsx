import { useParams, Navigate, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { getTreatmentBySlug } from "../../../../data/treatments";
import { getCategoryColor } from "../../../../lib/treatmentColors";
import TreatmentHero from "../../../../components/treatment-detail/TreatmentHero";
import TreatmentEffectsBar from "../../../../components/treatment-detail/TreatmentEffectsBar";
import TreatmentVisualCards from "../../../../components/treatment-detail/TreatmentVisualCards";
import ConsultBoxSimple from "../../../../components/treatment-detail/ConsultBoxSimple";
import ConsultBoxWithCTAs from "../../../../components/treatment-detail/ConsultBoxWithCTAs";
import ConsultBoxMessageBox from "../../../../components/treatment-detail/ConsultBoxMessageBox";
import MotivationMessage from "../../../../components/treatment-detail/MotivationMessage";
import StepStorySection from "../../../../components/treatment-detail/StepStorySection";
import SpecialFeaturesGrid from "../../../../components/treatment-detail/SpecialFeaturesGrid";
/** 치과(dental) 카테고리는 상세 페이지에서 브라운 톤으로 표시 */
const DENTAL_BROWN = { main: "#9A856D", bg: "#FFFFFF", label: "치과" };

export default function TreatmentDetail() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/program/integrated" replace />;

  const data = getTreatmentBySlug(slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8F3EA] flex flex-col items-center justify-center px-5 text-center gap-5">
        <p className="text-[#2F2A26] font-extrabold text-[20px]">치료 정보를 준비 중입니다</p>
        <p className="text-[14px] text-[#756A60]">곧 자세한 내용으로 찾아뵙겠습니다.</p>
        <Link
          to="/program/integrated"
          className="bg-[#9A856D] text-white text-[13px] font-bold px-5 py-3 rounded-full hover:bg-[#7C654F] transition-colors"
        >
          통합 맞춤 치료 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  // 치과 카테고리는 브라운 오버라이드, 나머지는 기존 컬러
  const colors = data.category === "dental" ? DENTAL_BROWN : getCategoryColor(data.category);

  const hasCustomCTAs = data.consultCTAs && data.consultCTAs.length > 0;

  // 상담 박스 렌더러
  const renderConsultBox = () => {
    if (data.consultBoxVariant === "message-box" && data.consultMessage) {
      return (
        <ConsultBoxMessageBox
          message={data.consultMessage}
          ctas={data.consultCTAs ?? []}
          colors={colors}
        />
      );
    }
    if (hasCustomCTAs) {
      return (
        <ConsultBoxWithCTAs
          question={data.consultQuestion}
          ctas={data.consultCTAs!}
          colors={colors}
        />
      );
    }
    return <ConsultBoxSimple question={data.consultQuestion} colors={colors} />;
  };

  return (
    <>
      <Helmet>
        <title>{data.title.replace(/\n/g, " ")} | Beautiful 뷰티풀 암요양병원</title>
        <meta name="description" content={data.subtitle.length > 0 ? data.subtitle.join(" ") : `${data.title} | 뷰티풀한방병원`} />
      </Helmet>

      <div className="bg-[#F8F3EA] min-h-screen">
        {/* Section 1 — 히어로 */}
        <TreatmentHero data={data} colors={colors} />

        {/* Section 2 — 효과 바 (hideEffectsBar 또는 빈 배열이면 생략) */}
        {!data.hideEffectsBar && data.effects.length > 0 && (
          <TreatmentEffectsBar
            effects={data.effects}
            conclusion={data.effectsConclusion}
            simpleMode={data.effectsSimpleMode ?? false}
          />
        )}

        {/* Section 3 — 비주얼 카드 (있을 때만) */}
        {data.visualCards.length > 0 && (
          <TreatmentVisualCards
            title={data.visualCardsTitle}
            cards={data.visualCards}
            colors={colors}
            carousel={data.visualCardsCarousel ?? false}
            layout={data.visualCardsLayout ?? "default"}
          />
        )}

        {/* Section 4 — 단계별 스토리텔링 (있을 때만) */}
        {data.stepSections && data.stepSections.length > 0 && (
          <section className="px-5 lg:px-8 py-10 lg:py-14">
            <div className="max-w-6xl mx-auto space-y-4">
              {data.stepSections.map((section) => (
                <StepStorySection
                  key={section.number}
                  section={section}
                  colors={colors}
                />
              ))}

              {/* 특별함 그리드 — stepSections 마지막 이후에 표시 */}
              {data.specialFeatures && data.specialFeatures.length > 0 && (
                <SpecialFeaturesGrid
                  title={data.specialFeaturesTitle}
                  features={data.specialFeatures}
                  colors={colors}
                />
              )}
            </div>
          </section>
        )}

        {/* Section 5 — 상담 박스 */}
        {renderConsultBox()}

        {/* Section 6 — 마무리 메시지 (있을 때만) */}
        {data.closingMessage && data.closingMessage.length > 0 && (
          <MotivationMessage
            message={data.closingMessage}
            sub={data.closingSubMessage ?? ""}
            image={data.closingImage ?? ""}
          />
        )}
      </div>
    </>
  );
}
