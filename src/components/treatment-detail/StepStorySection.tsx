/**
 * StepStorySection — 단계별 스토리텔링 카드 (01/02/03)
 * 구조: 번호 뱃지 + 제목 / 불릿 리스트 + 이미지(선택)
 * 사용: 항암 치과 구강관리 등
 */
import type { StepStorySection as StepStorySectionType } from "../../types/treatment";

interface StepStorySectionProps {
  section: StepStorySectionType;
  colors: { main: string; bg: string };
}

export default function StepStorySection({ section, colors }: StepStorySectionProps) {
  const hasImage = Boolean(section.image && section.image.length > 0);
  const hasBullets = section.bullets.length > 0;

  return (
    <div className="bg-[#FBF5E9] rounded-2xl overflow-hidden shadow-sm">
      {/* 헤더 — 번호 뱃지 + 제목 */}
      <div
        className="flex items-center gap-4 px-6 py-5"
        style={{ backgroundColor: `${colors.main}15` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ backgroundColor: colors.main }}
        >
          <span className="text-white text-[15px] font-extrabold">{section.number}</span>
        </div>
        <h3 className="text-[17px] sm:text-[19px] font-extrabold text-[#2A1F18] leading-snug">
          {section.title}
        </h3>
      </div>

      {/* 본문 — 불릿 리스트 + 이미지 */}
      {hasBullets && (
        <div
          className={`grid gap-6 px-6 py-6 ${
            hasImage ? "md:grid-cols-2 items-center" : ""
          }`}
        >
          {/* 불릿 리스트 */}
          <ul className="space-y-3">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors.main }}
                />
                <span className="text-[14px] text-[#2A1F18] leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* 이미지 */}
          {hasImage && (
            <div className="rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={section.image}
                  alt={section.imageAlt ?? section.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
