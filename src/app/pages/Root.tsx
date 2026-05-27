import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import FloatingConsultButton from "../components/FloatingConsultButton";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import HamburgerMenu from "../../components/menu/HamburgerMenu";
import BottomActionBar from "../../components/home/BottomActionBar";

export default function Root() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // 페이지 전환 시 스크롤 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF6EE] root-wrapper">
      {/* 모든 페이지 공통 헤더 */}
      <GlobalHeader onMenuOpen={() => setMenuOpen(true)} />

      {/* 전역 햄버거 메뉴 드로어 */}
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {isHome ? (
        /* 홈: 레이아웃 래퍼 없이 직접 렌더 */
        <main className="flex-1">
          <Outlet />
        </main>
      ) : (
        /* 기타 페이지: 사이드바 + 푸터 레이아웃 */
        <>
          <div
            className="flex-1 lg:flex max-w-screen-xl mx-auto w-full gap-8"
            style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
          >
            <main className="flex-1 bg-white">
              <Outlet />
            </main>

            {/* Desktop Sidebar */}
            <aside className="w-80 flex-shrink-0 lg:p-8">
              <FloatingConsultButton />
            </aside>
          </div>

          <GlobalFooter />
        </>
      )}

      {/* 전역 하단 4버튼 액션바 */}
      <BottomActionBar />
    </div>
  );
}
