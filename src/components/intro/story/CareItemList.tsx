import CareItemIcon from "./CareItemIcon";
import type { CareItem } from "../../../data/brandStoryData";

interface CareItemListProps {
  items: CareItem[];
}

export default function CareItemList({ items }: CareItemListProps) {
  const is4 = items.length === 4;

  return (
    <div
      className={[
        "grid gap-4",
        is4
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-3",
      ].join(" ")}
    >
      {items.map((item) => (
        <div key={item.title} className="flex flex-col items-center text-center gap-2">
          {/* 원형 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex items-center justify-center flex-shrink-0">
            <CareItemIcon icon={item.icon} size={24} />
          </div>
          {/* 텍스트 */}
          <p className="text-[13px] font-extrabold text-[#2F2A26] leading-tight">
            {item.title}
          </p>
          <div>
            {item.description.map((line, i) => (
              <p key={i} className="text-[11px] sm:text-[12px] text-[#756A60] leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
