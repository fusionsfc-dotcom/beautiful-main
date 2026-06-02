import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
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
  const [loginInitialMode, setLoginInitialMode] = useState<"login" | "signup">("login");
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchParams.get("login") === "1" && !isAuthenticated) {
      setLoginPurpose("general");
      setShowLoginModal(true);
      searchParams.delete("login");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, isAuthenticated, setSearchParams]);

  const handleCasesClick = () => {
    if (!isAuthenticated) {
      setLoginPurpose("cases");
      setLoginInitialMode("signup");
      setShowLoginModal(true);
    } else {
      navigate("/cases");
    }
  };

  const handleLoginClick = () => {
    setLoginPurpose("general");
    setLoginInitialMode("login");
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
        className={`sticky top-0 z-50 bg-[#F8F3EA] border-b border-[#D8CDBE] transition-shadow duration-300 ${
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
                stroke="#9A856D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
                stroke="#9A856D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="1.5" fill="#9A856D" />
            </svg>
            <div>
              <p className="text-[10px] tracking-widest text-[#9A856D] font-light leading-none">
                Beautiful
              </p>
              <p className="text-[14px] font-bold text-[#6A5542] leading-none mt-0.5">
                뷰티풀 한방병원
              </p>
            </div>
          </Link>

          <button
            onClick={onMenuOpen}
            aria-label="메뉴 열기"
            className="flex flex-col gap-[5px] p-2 -mr-1"
          >
            <span className="block w-6 h-[2px] bg-[#6A5542] rounded-full" />
            <span className="block w-6 h-[2px] bg-[#6A5542] rounded-full" />
            <span className="block w-6 h-[2px] bg-[#6A5542] rounded-full" />
          </button>
        </div>

        {/* ── 데스크탑: 풀 내비게이션 ── */}
        <div className="hidden lg:block h-20">
          <div className="max-w-screen-xl mx-auto px-8 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M16 10C16 10 10 4 4 6C2 10 6 16 16 16C6 16 2 22 4 26C10 28 16 22 16 22"
                  stroke="#9A856D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
                  stroke="#9A856D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="1.5" fill="#9A856D" />
              </svg>
              <div>
                <p className="text-[11px] tracking-widest text-[#9A856D] font-light leading-none">
                  Beautiful
                </p>
                <p className="text-xl font-bold text-[#6A5542] leading-none mt-0.5">
                  뷰티풀한방병원
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-8">
              <Link to="/" className="text-[#756A60] hover:text-[#6A5542] transition-colors">홈</Link>
              <Link to="/clinics" className="text-[#756A60] hover:text-[#6A5542] transition-colors">클리닉</Link>
              <Link to="/facilities" className="text-[#756A60] hover:text-[#6A5542] transition-colors">치료환경</Link>
              <Link to="/columns" className="text-[#756A60] hover:text-[#6A5542] transition-colors">뷰티풀이야기</Link>
              <Link to="/about" className="text-[#756A60] hover:text-[#6A5542] transition-colors">병원소개</Link>
              <button
                onClick={handleCasesClick}
                className="text-[#756A60] hover:text-[#6A5542] transition-colors"
              >
                치료사례
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {/* 햄버거 (데스크탑에서도 전체 메뉴 열기) */}
              <button
                onClick={onMenuOpen}
                aria-label="전체 메뉴"
                className="flex flex-col gap-[5px] p-2 text-[#756A60] hover:text-[#6A5542] transition-colors"
              >
                <span className="block w-5 h-[2px] bg-current rounded-full" />
                <span className="block w-5 h-[2px] bg-current rounded-full" />
                <span className="block w-5 h-[2px] bg-current rounded-full" />
              </button>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-[#9A856D] border border-[#9A856D] px-4 py-2 rounded-md hover:bg-[#7C654F]/10 transition-colors text-sm"
                  >
                    로그인
                  </button>
                  <Link
                    to="/reservation"
                    className="bg-[#8BC31F] text-white px-4 py-2 rounded-md hover:bg-[#75A915] transition-colors text-sm"
                  >
                    상담 신청
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 text-[#6A5542] hover:text-[#9A856D] transition-colors">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{getUserDisplayName()}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem asChild>
                        <Link to="/my-consultations">내 상담 내역</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-results">내 검사 결과</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-reports">치료 경과 리포트</Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="text-[#9A856D] font-medium">
                            관리자 페이지
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to="/reservation"
                    className="bg-[#8BC31F] text-white px-4 py-2 rounded-md hover:bg-[#75A915] transition-colors text-sm"
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
        initialMode={loginInitialMode}
      />
    </>
  );
}
