import { useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import MenuHeader from "./MenuHeader";
import TopQuickActions from "./TopQuickActions";
import MenuCategoryItem from "./MenuCategory";
import BottomQuickActions from "./BottomQuickActions";
import { menuCategories } from "../../data/menuData";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const location = useLocation();

  // 페이지 이동 시 자동 닫기
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC 키로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* Drawer 패널 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        className="fixed top-0 right-0 bottom-0 z-[70] w-full lg:w-[420px] bg-[#FAF6EE] flex flex-col shadow-2xl"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
      >
        {/* 헤더 (고정) */}
        <MenuHeader onClose={onClose} />

        {/* 스크롤 가능한 본문 */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* 상단 3개 카드 */}
          <TopQuickActions onClose={onClose} />

          {/* 구분선 */}
          <div className="h-px bg-[#E8DCC8] mx-4" />

          {/* 카테고리 아코디언 목록 */}
          <div className="px-4 py-4 flex flex-col gap-3">
            {menuCategories.map((category) => (
              <MenuCategoryItem
                key={category.id}
                category={category}
                onClose={onClose}
              />
            ))}
          </div>

          {/* 구분선 */}
          <div className="h-px bg-[#E8DCC8] mx-4" />

          {/* 하단 퀵 액션 4개 */}
          <div className="px-4 py-4">
            <BottomQuickActions onClose={onClose} />
          </div>

          {/* 자물쇠 안내 */}
          <p className="text-center text-[12px] text-[#888] px-4 pb-8">
            🔒 로그인 필요한 메뉴는 자물쇠 아이콘으로 안내됩니다.
          </p>
        </div>
      </div>
    </>
  );
}
