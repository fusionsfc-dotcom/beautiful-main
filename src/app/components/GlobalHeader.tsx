import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface GlobalHeaderProps {
  onMenuOpen: () => void;
}

export default function GlobalHeader({ onMenuOpen }: GlobalHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPurpose, setLoginPurpose] = useState<"cases" | "general">("general");
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCasesClick = () => {
    if (!isAuthenticated) {
      setLoginPurpose("cases");
      setShowLoginModal(true);
    } else {
      navigate("/cases");
    }
  };

  const handleLoginClick = () => {
    setLoginPurpose("general");
    setShowLoginModal(true);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      const firstName = user.user_metadata.name.charAt(0);
      return firstName + "O".repeat(user.user_metadata.name.length - 1) + "님";
    }
    if (user?.email) return user.email.split("@")[0] + "O님";
    return "사용자님";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-[#FAF6EE] border-b border-[#E8DCC8] transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/8" : ""
        }`}
      >
        {/* ── 모바일: 나비 로고 + 햄버거 ── */}
        <div className="lg:hidden h-14 px-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            {/* 골드 나비 SVG */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M16 10C16 10 10 4 4 6C2 10 6 16 16 16C6 16 2 22 4 26C10 28 16 22 16 22"
                stroke="#C9A567"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
                stroke="#C9A567"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="1.5" fill="#C9A567" />
            </svg>
            <div>
              <p className="text-[10px] tracking-widest text-[#C9A567] font-light leading-none">
                Beautiful
              </p>
              <p className="text-[14px] font-bold text-[#3D2817] leading-none mt-0.5">
                뷰티풀 한방병원
              </p>
            </div>
          </Link>

          <button
            onClick={onMenuOpen}
            aria-label="메뉴 열기"
            className="flex flex-col gap-[5px] p-2 -mr-1"
          >
            <span className="block w-6 h-[2px] bg-[#3D2817] rounded-full" />
            <span className="block w-6 h-[2px] bg-[#3D2817] rounded-full" />
            <span className="block w-6 h-[2px] bg-[#3D2817] rounded-full" />
          </button>
        </div>

        {/* ── 데스크탑: 풀 내비게이션 ── */}
        <div className="hidden lg:block h-20">
          <div className="max-w-screen-xl mx-auto px-8 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M16 10C16 10 10 4 4 6C2 10 6 16 16 16C6 16 2 22 4 26C10 28 16 22 16 22"
                  stroke="#C9A567"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
                  stroke="#C9A567"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="1.5" fill="#C9A567" />
              </svg>
              <div>
                <p className="text-[11px] tracking-widest text-[#C9A567] font-light leading-none">
                  Beautiful
                </p>
                <p className="text-xl font-bold text-[#3D2817] leading-none mt-0.5">
                  뷰티풀한방병원
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-8">
              <Link to="/" className="text-[#6B5547] hover:text-[#3D2817] transition-colors">홈</Link>
              <Link to="/clinics" className="text-[#6B5547] hover:text-[#3D2817] transition-colors">클리닉</Link>
              <Link to="/facilities" className="text-[#6B5547] hover:text-[#3D2817] transition-colors">치료환경</Link>
              <Link to="/columns" className="text-[#6B5547] hover:text-[#3D2817] transition-colors">뷰티풀이야기</Link>
              <Link to="/about" className="text-[#6B5547] hover:text-[#3D2817] transition-colors">병원소개</Link>
              <button
                onClick={handleCasesClick}
                className="text-[#6B5547] hover:text-[#3D2817] transition-colors"
              >
                치료사례
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {/* 햄버거 (데스크탑에서도 전체 메뉴 열기) */}
              <button
                onClick={onMenuOpen}
                aria-label="전체 메뉴"
                className="flex flex-col gap-[5px] p-2 text-[#6B5547] hover:text-[#3D2817] transition-colors"
              >
                <span className="block w-5 h-[2px] bg-current rounded-full" />
                <span className="block w-5 h-[2px] bg-current rounded-full" />
                <span className="block w-5 h-[2px] bg-current rounded-full" />
              </button>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-[#C9A567] border border-[#C9A567] px-4 py-2 rounded-md hover:bg-[#C9A567]/10 transition-colors text-sm"
                  >
                    로그인
                  </button>
                  <Link
                    to="/reservation"
                    className="bg-[#3D2817] text-white px-4 py-2 rounded-md hover:bg-[#5B3A1F] transition-colors text-sm"
                  >
                    상담 신청
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 text-[#3D2817] hover:text-[#C9A567] transition-colors">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{getUserDisplayName()}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem onClick={() => navigate("/my-consultations")}>내 상담 내역</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/my-results")}>내 검사 결과</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/my-reports")}>치료 경과 리포트</DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => navigate("/admin")} className="text-[#C9A567] font-medium">
                          관리자 페이지
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">로그아웃</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to="/reservation"
                    className="bg-[#3D2817] text-white px-4 py-2 rounded-md hover:bg-[#5B3A1F] transition-colors text-sm"
                  >
                    상담 신청
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        purpose={loginPurpose}
      />
    </>
  );
}
