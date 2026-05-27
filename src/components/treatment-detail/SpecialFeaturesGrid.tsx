/**
 * SpecialFeaturesGrid — 병원 특별함 4개 아이콘 그리드
 * 단계별 스토리텔링의 마지막(03) 섹션 내부에 렌더링
 * 구조: 타이틀 + 2×2(모바일) / 4열(데스크탑) 아이콘 그리드
 */
import { ShieldPlus, Heart, ScanFace } from "lucide-react";
import type { SpecialFeature } from "../../types/treatment";

function FeatureIcon({ icon, color, size = 40 }: { icon: string; color: string; size?: number }) {
  const p = { size, strokeWidth: 1.5 };

  switch (icon) {
    case "shield-plus":
      return <ShieldPlus {...p} color={color} />;
    case "heart":
      return <Heart {...p} color={color} />;
    case "scan-face":
      return <ScanFace {...p} color={color} />;

    // 치아 아이콘 (커스텀 SVG)
    case "tooth":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5C7.5 11.5 8 13 8 15c0 2 .5 5 2 5s2-2.5 2-4c0 1.5.5 4 2 4s2-3 2-5c0-2 .5-3.5 1-4.5.5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z" />
        </svg>
      );

    default:
      return <ShieldPlus {...p} color={color} />;
  }
}

interface SpecialFeaturesGridProps {
  title?: string;
  features: SpecialFeature[];
  colors: { main: string; bg: string };
}

export default function SpecialFeaturesGrid({
  title,
  features,
  colors,
}: SpecialFeaturesGridProps) {
  return (
    <div className="bg-[#FBF5E9] rounded-2xl shadow-sm px-6 py-7 mt-4">
      {/* 03 번호 뱃지 + 타이틀 */}
      <div
        className="flex items-center gap-4 mb-7 pb-5"
        style={{ borderBottom: `1px solid ${colors.main}30` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ backgroundColor: colors.main }}
        >
          <span className="text-white text-[15px] font-extrabold">03</span>
        </div>
        <h3 className="text-[17px] sm:text-[19px] font-extrabold text-[#2A1F18] leading-snug">
          {title ?? "뷰티풀 한방병원 특별함"}
        </h3>
      </div>

      {/* 4개 아이콘 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {features.map((feat, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3 py-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: `${colors.main}18` }}
            >
              <FeatureIcon icon={feat.icon} color={colors.main} />
            </div>
            <p className="text-[13px] font-bold text-[#2A1F18] leading-snug">
              {feat.title.map((line, j) => (
                <span key={j} className="block">{line}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
