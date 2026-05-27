import CareItemList from "./CareItemList";
import StageFooterMessage from "./StageFooterMessage";
import type { JourneyStage } from "../../../data/brandStoryData";

interface JourneyStageCardProps {
  stage: JourneyStage;
}

export default function JourneyStageCard({ stage }: JourneyStageCardProps) {
  return (
    <div className="bg-[#FBF5E9] rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 lg:p-8">
        {/* 데스크탑: 좌(텍스트+케어 60%) 우(이미지 40%) */}
        {/* 모바일: 세로 적층 */}
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-10">

          {/* ── 좌측: 텍스트 + 케어 리스트 ── */}
          <div className="flex-1 min-w-0">
            {/* 번호 뱃지 */}
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#3D2817] text-white text-[15px] font-extrabold mb-4">
              {stage.number}
            </span>

            {/* 타이틀 */}
            <h2 className="text-[22px] lg:text-[26px] font-extrabold text-[#2A1F18] leading-snug mb-3">
              {stage.title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < stage.title.length - 1 && <br />}
                </span>
              ))}
            </h2>

            {/* 서브 카피 */}
            <div className="mb-6">
              {stage.subtitle.map((line, i) => (
                <p key={i} className="text-[14px] text-[#6B5547] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* 케어 항목 리스트 */}
            <CareItemList items={stage.cares} />
          </div>

          {/* ── 우측: 이미지 ── */}
          <div className="w-full lg:w-[38%] lg:flex-shrink-0 h-52 sm:h-64 lg:h-auto rounded-xl overflow-hidden relative min-h-[220px]">
            {/* TODO: 실제 사진으로 교체 필요 */}
            <img
              src={stage.image}
              alt={stage.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>

        {/* ── 하단 베이지 메시지 박스 ── */}
        <StageFooterMessage
          icon={stage.footerIcon}
          message={stage.footerMessage}
        />
      </div>
    </div>
  );
}
