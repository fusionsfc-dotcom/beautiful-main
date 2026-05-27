import { Helmet } from "react-helmet-async";
import StoryHero from "../../../components/intro/story/StoryHero";
import CoreValuesBar from "../../../components/intro/story/CoreValuesBar";
import JourneyStageCard from "../../../components/intro/story/JourneyStageCard";
import CollaborationBanner from "../../../components/intro/story/CollaborationBanner";
import QuickActionsTriple from "../../../components/program/tbt/QuickActionsTriple";
import { journeyStages } from "../../../data/brandStoryData";

export default function BrandStory() {
  return (
    <>
      <Helmet>
        <title>브랜드 스토리 & 철학 | Beautiful 뷰티풀 암요양병원</title>
        <meta
          name="description"
          content="암은 절망이 아닌 새로운 시작입니다. 진단부터 치료·재발 관리까지, 뷰티풀 암요양병원이 환자의 여정 전 단계에서 함께합니다."
        />
      </Helmet>

      <div className="bg-[#FAF6EE] min-h-screen">
        {/* Section 1 — 히어로 */}
        <StoryHero />

        {/* Section 2 — 3대 핵심 가치 */}
        <CoreValuesBar />

        {/* Section 3·4·5 — 여정 3단계 카드 */}
        <section className="px-5 lg:px-8 pb-12 lg:pb-16">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            {journeyStages.map((stage) => (
              <JourneyStageCard key={stage.number} stage={stage} />
            ))}
          </div>
        </section>

        {/* Section 6 — 다크 브라운 협진 안내 */}
        <CollaborationBanner />

        {/* Section 7 — 3개 빠른 액션 */}
        <QuickActionsTriple />
      </div>
    </>
  );
}
