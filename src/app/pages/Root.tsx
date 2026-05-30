import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import HamburgerMenu from "../../components/menu/HamburgerMenu";
import BottomActionBar from "../../components/home/BottomActionBar";

export default function Root() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAuthOpen, setMenuAuthOpen] = useState(false);
  const [menuAuthMode, setMenuAuthMode] = useState<"login" | "signup">("login");
  const { isAuthenticated } = useAuth();

  const openMenuAuth = (mode: "login" | "signup") => {
    if (isAuthenticated) return;
    setMenuAuthMode(mode);
    setMenuAuthOpen(true);
  };

  const closeMenuAuth = () => setMenuAuthOpen(false);

  const handleMenuAuthSuccess = () => {
    setMenuAuthOpen(false);
    setMenuOpen(false);
  };

  // 페이지 전환 시 스크롤 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-[100svh] flex flex-col bg-[#F8F3EA] root-wrapper">
      {/* 모든 페이지 공통 헤더 */}
      <GlobalHeader onMenuOpen={() => setMenuOpen(true)} />

      {/* 전역 햄버거 메뉴 드로어 */}
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenAuth={openMenuAuth}
      />

      {/* 메뉴 로그인/회원가입 — 드로어 transform 밖에서 렌더 (fixed 포지션 보장) */}
      <LoginModal
        isOpen={menuAuthOpen}
        onClose={closeMenuAuth}
        onSuccess={handleMenuAuthSuccess}
        initialMode={menuAuthMode}
      />

      {isHome ? (
        /* 홈: 레이아웃 래퍼 없이 직접 렌더 */
        <main className="flex-1">
          <Outlet />
        </main>
      ) : (
        /* 기타 페이지: 사이드바 + 푸터 레이아웃 */
        <>
          <div
            className="flex-1 max-w-screen-xl mx-auto w-full"
            style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
          >
            <main className="bg-white">
              <Outlet />
            </main>
          </div>

          <GlobalFooter />
        </>
      )}

      {/* 전역 하단 4버튼 액션바 */}
      <BottomActionBar />
    </div>
  );
}
