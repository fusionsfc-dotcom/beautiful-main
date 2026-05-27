import {
  Leaf,
  Dumbbell,
  User,
  Check,
  Smile,
  SmilePlus,
  ClipboardList,
  ShieldCheck,
  PersonStanding,
  Scale,
  HeartHandshake,
  Laugh,
} from "lucide-react";
import type { ProgramFeatureIcon } from "../../../data/rehabPrograms";

const ICON_MAP: Record<ProgramFeatureIcon, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  leaf: Leaf,
  muscle: Dumbbell,        // lucide에 Muscle 없어 Dumbbell 대체
  person: User,
  check: Check,
  smile: Smile,
  happy: SmilePlus,
  dumbbell: Dumbbell,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  runner: PersonStanding,  // lucide에 Runner 없어 PersonStanding 대체
  balance: Scale,
  "heart-hand": HeartHandshake,
  "smile-face": Laugh,
};

interface ProgramFeatureProps {
  icon: ProgramFeatureIcon;
  title: string;
  subtitle?: string;
  compact?: boolean; // 카드 안에서 작게 쓸 때
}

export default function ProgramFeature({
  icon,
  title,
  subtitle,
  compact = false,
}: ProgramFeatureProps) {
  const Icon = ICON_MAP[icon];

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5EEE0] flex items-center justify-center">
          <Icon size={12} color="#5B3A1F" strokeWidth={1.8} />
        </div>
        <span className="text-[12px] text-[#5B3A1F] font-medium leading-tight truncate">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-full bg-[#F5EEE0] flex items-center justify-center">
        <Icon size={18} color="#5B3A1F" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#2A1F18] leading-tight">
          {title}
        </p>
        {subtitle && (
          <p className="text-[11px] text-[#6B5547] leading-tight mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
