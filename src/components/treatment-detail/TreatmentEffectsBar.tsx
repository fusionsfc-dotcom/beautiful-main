import { Thermometer, ShieldPlus, Activity, Heart, Droplets, Leaf, Brain, Clock, Crown, Users, RefreshCw, Target, ShieldAlert, ScanFace } from "lucide-react";
import type { TreatmentEffect } from "../../types/treatment";

/** simpleMode: true일 때 아이콘을 더 크게 */
function EffectIcon({ icon, size = 44 }: { icon: string; size?: number }) {
  const p = { size, color: "#5B3A1F", strokeWidth: 1.5 };
  switch (icon) {
    case "thermometer":  return <Thermometer {...p} />;
    case "shield-plus":  return <ShieldPlus {...p} />;
    case "activity":     return <Activity {...p} />;
    case "heart":        return <Heart {...p} />;
    case "droplets":     return <Droplets {...p} />;
    case "leaf":         return <Leaf {...p} />;
    case "brain":        return <Brain {...p} />;
    case "clock":        return <Clock {...p} />;
    case "crown":        return <Crown {...p} />;
    case "users":        return <Users {...p} />;
    case "refresh-cw":   return <RefreshCw {...p} />;
    case "target":       return <Target {...p} />;
    case "shield-alert": return <ShieldAlert {...p} />;
    case "scan-face":    return <ScanFace {...p} />;
    // 치아 아이콘 — 인라인 SVG (lucide에 없음)
    case "tooth":
      return (
        <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none"
          stroke="#5B3A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5C7.5 11.5 8 13 8 15c0 2 .5 5 2 5s2-2.5 2-4c0 1.5.5 4 2 4s2-3 2-5c0-2 .5-3.5 1-4.5.5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z" />
        </svg>
      );
    default:             return <Activity {...p} />;
  }
}

interface TreatmentEffectsBarProps {
  effects: TreatmentEffect[];
  /** 없으면 하단 강조 박스 생략 */
  conclusion?: string;
  /** true면 아이콘+제목만 표시, description 생략 (침 치료 등) */
  simpleMode?: boolean;
}

export default function TreatmentEffectsBar({
  effects,
  conclusion,
  simpleMode = false,
}: TreatmentEffectsBarProps) {
  const count = effects.length;

  // simpleMode (침 치료): 더 큰 아이콘, 제목만, 깔끔한 2×2 / 4열 그리드
  if (simpleMode) {
    return (
      <section className="px-5 lg:px-8 py-10 lg:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FBF5E9] rounded-2xl px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {effects.map((eff) => (
                <div
                  key={eff.title}
                  className="flex flex-col items-center text-center gap-4 py-4 px-2"
                >
                  <div className="w-20 h-20 rounded-full bg-[#FAF6EE] flex items-center justify-center shadow-sm">
                    <EffectIcon icon={eff.icon} size={36} />
                  </div>
                  <p className="text-[14px] font-extrabold text-[#2A1F18] leading-snug">
                    {eff.title}
                  </p>
                </div>
              ))}
            </div>

            {conclusion && (
              <div className="mt-6 bg-[#3D2817] rounded-xl px-5 py-4 text-center">
                <p className="text-white font-extrabold text-[14px] lg:text-[15px]">
                  {conclusion}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 기본 모드 (왕뜸·뇌신경뜸)
  const gridClass =
    count === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3";
  const divideClass = count === 4 ? "" : "divide-x divide-[#E8DCC8]";

  return (
    <section className="px-5 lg:px-8 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FBF5E9] rounded-2xl px-6 pt-8 pb-7">
          <div className={`grid ${gridClass} ${divideClass} ${count === 4 ? "gap-y-6" : "mb-7"}`}>
            {effects.map((eff) => (
              <div
                key={eff.title}
                className={`flex flex-col items-center text-center px-3 py-2 gap-3 ${
                  count === 4
                    ? "border-r border-b border-[#E8DCC8] last:border-r-0 even:border-r-0 md:border-b-0 md:[&:nth-child(4)]:border-r-0"
                    : ""
                }`}
              >
                <EffectIcon icon={eff.icon} />
                <p className="text-[14px] font-extrabold text-[#2A1F18]">{eff.title}</p>
                {eff.description && eff.description.length > 0 && (
                  <div>
                    {eff.description.map((line, i) => (
                      <p key={i} className="text-[12px] text-[#6B5547] leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {conclusion && (
            <div className={`bg-[#3D2817] rounded-xl px-5 py-4 text-center ${count === 4 ? "mt-6" : ""}`}>
              <p className="text-white font-extrabold text-[14px] lg:text-[15px]">
                {conclusion}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
