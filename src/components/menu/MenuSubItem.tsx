import { Link, useNavigate } from "react-router";
import BadgeHot from "./BadgeHot";
import BadgeNew from "./BadgeNew";
import type { MenuItem } from "../../data/menuData";

interface MenuSubItemProps extends MenuItem {
  onClose: () => void;
}

export default function MenuSubItem({
  label,
  href,
  badge,
  locked,
  lockedText,
  onClose,
}: MenuSubItemProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (locked) {
      e.preventDefault();
      onClose();
      navigate(`/login?redirect=${encodeURIComponent(href)}`);
      return;
    }
    // 해시(#) 포함 링크: 드로어를 먼저 닫고 이동
    if (href.includes("#")) {
      e.preventDefault();
      onClose();
      setTimeout(() => navigate(href), 50);
      return;
    }
    onClose();
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5EEE0] transition-colors group"
    >
      {/* 불릿 */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B6F47] flex-shrink-0 mt-0.5" />

      {/* 라벨 */}
      <span className="flex-1 text-[15px] text-[#2A1F18] font-medium leading-snug">
        {label}
      </span>

      {/* 뱃지 */}
      {badge === "HOT" && <BadgeHot />}
      {badge === "NEW" && <BadgeNew />}

      {/* 자물쇠 */}
      {locked && (
        <span className="flex items-center gap-1 text-[11px] text-[#888] flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {lockedText}
        </span>
      )}

      {/* 화살표 */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B6F47"
        strokeWidth="2"
        strokeLinecap="round"
        className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}
