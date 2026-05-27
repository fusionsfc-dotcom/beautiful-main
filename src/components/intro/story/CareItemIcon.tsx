/** CareItemIcon — 케어 항목별 아이콘 (lucide 우선, 없으면 인라인 SVG) */
import {
  Utensils, Footprints, ShieldPlus, Droplets,
  Dumbbell, Heart, ClipboardCheck, Leaf,
} from "lucide-react";

interface CareItemIconProps {
  icon: string;
  size?: number;
}

const C = "#5B3A1F";

export default function CareItemIcon({ icon, size = 26 }: CareItemIconProps) {
  const p = { size, color: C, strokeWidth: 1.8 };
  switch (icon) {
    case "utensils":        return <Utensils {...p} />;
    case "footprints":      return <Footprints {...p} />;
    case "shield-plus":     return <ShieldPlus {...p} />;
    case "droplets":        return <Droplets {...p} />;
    case "dumbbell":        return <Dumbbell {...p} />;
    case "heart":           return <Heart {...p} />;
    case "clipboard-check": return <ClipboardCheck {...p} />;
    case "leaf":            return <Leaf {...p} />;
    case "bowl-leaf":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11h16a8 8 0 0 1-16 0z" />
          <path d="M12 11V5" />
          <path d="M10 7c0-1 .8-2 2-2s2 1 2 2" />
          <path d="M8 5c1-2 4-2 4 0" />
        </svg>
      );
    default: return <Heart {...p} />;
  }
}
