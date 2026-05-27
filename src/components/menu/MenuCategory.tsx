import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  Shield,
  Building2,
  ClipboardCheck,
  User,
  Calendar,
  HelpCircle,
} from "lucide-react";
import BadgeHot from "./BadgeHot";
import MenuSubItem from "./MenuSubItem";
import type { MenuCategory as MenuCategoryType } from "../../data/menuData";

const ICON_MAP = {
  shield: Shield,
  hospital: Building2,
  clipboard: ClipboardCheck,
  person: User,
  calendar: Calendar,
  question: HelpCircle,
} as const;

interface MenuCategoryProps {
  category: MenuCategoryType;
  onClose: () => void;
}

export default function MenuCategory({ category, onClose }: MenuCategoryProps) {
  const [open, setOpen] = useState(category.defaultOpen ?? false);
  const contentRef = useRef<HTMLDivElement>(null);

  const Icon = ICON_MAP[category.icon];
  const hasItems = category.items.length > 0;

  // FAQ 같이 서브메뉴 없는 카테고리는 헤더 자체가 링크
  if (!hasItems) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Link
          to={`/${category.id}`}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-4 hover:bg-[#FAF6EE] transition-colors"
        >
          {/* 아이콘 */}
          <div className="w-9 h-9 rounded-full bg-[#F5EEE0] flex items-center justify-center flex-shrink-0">
            <Icon size={18} color="#5B3A1F" strokeWidth={1.8} />
          </div>
          {/* 번호 + 제목 */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[12px] text-[#C9A567] font-semibold w-5">
              {category.number}.
            </span>
            <span className="text-[16px] font-bold text-[#2A1F18]">
              {category.title}
            </span>
          </div>
          {/* 화살표 */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* 카테고리 헤더 (토글) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#FAF6EE] transition-colors text-left"
      >
        {/* 아이콘 */}
        <div className="w-9 h-9 rounded-full bg-[#F5EEE0] flex items-center justify-center flex-shrink-0">
          <Icon size={18} color="#5B3A1F" strokeWidth={1.8} />
        </div>

        {/* 번호 + 제목 + 뱃지 */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[12px] text-[#C9A567] font-semibold w-5 flex-shrink-0">
            {category.number}.
          </span>
          <span className="text-[16px] font-bold text-[#2A1F18] truncate">
            {category.title}
          </span>
          {category.badge === "HOT" && <BadgeHot />}
        </div>

        {/* 화살표 */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8B6F47"
          strokeWidth="2"
          strokeLinecap="round"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* 아코디언 콘텐츠 */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 1000) + "px" : "0px",
        }}
      >
        <div className="border-t border-[#F5EEE0] divide-y divide-[#F5EEE0]">
          {category.items.map((item) => (
            <MenuSubItem key={item.href} {...item} onClose={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}
