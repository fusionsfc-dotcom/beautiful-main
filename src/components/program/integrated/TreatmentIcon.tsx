/** 치료 아이콘 — lucide 없는 치아·침 계열은 인라인 SVG 사용 */
import { Syringe, Flame, ShieldCheck, Droplets, UserCheck, Brain, Thermometer } from "lucide-react";

interface TreatmentIconProps {
  icon: string;
  color: string;
  size?: number;
}

export default function TreatmentIcon({ icon, color, size = 22 }: TreatmentIconProps) {
  const props = { size, color, strokeWidth: 1.8 };

  switch (icon) {
    case "syringe":   return <Syringe {...props} />;
    case "flame":     return <Flame {...props} />;
    case "brain":       return <Brain {...props} />;
    case "thermometer": return <Thermometer {...props} />;
    case "shield":      return <ShieldCheck {...props} />;

    // 침 아이콘
    case "needle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="20" y1="4" x2="5" y2="19" />
          <path d="M17 2l3 3" />
          <path d="M5 19l-2 2" />
          <path d="M13 6l2 2" />
        </svg>
      );
    case "droplet":   return <Droplets {...props} />;
    case "user-check":return <UserCheck {...props} />;

    // 치아 아이콘 — lucide에 없어 커스텀 SVG 사용
    case "tooth":
    case "tooth-shield":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5C7.5 11.5 8 13 8 15c0 2 .5 5 2 5s2-2.5 2-4c0 1.5.5 4 2 4s2-3 2-5c0-2 .5-3.5 1-4.5.5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z" />
          {icon === "tooth-shield" && (
            <path d="M9 7.5s1 .5 3 .5 3-.5 3-.5" />
          )}
        </svg>
      );

    default:
      return <ShieldCheck {...props} />;
  }
}
