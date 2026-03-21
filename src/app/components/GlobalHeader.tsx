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
/** 임시: Vercel 링크테스트용 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPurpose, setLoginPurpose] = useState<"cases" | "general">("general");
  const { user, isAuthenticated, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

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
      // 이름에서 첫 글자만 남기고 나머지는 O로 치환
      const firstName = user.user_metadata.name.charAt(0);
      const maskedName = firstName + "O".repeat(user.user_metadata.name.length - 1);
      return `${maskedName}님`;
    }
    if (user?.email) {
      return user.email.split('@')[0] + 'O님';
    }
    return "사용자님";
  };

  return (
    <>
      <header
        className={`sticky top-0 bg-white border-b border-gray-200 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/8" : ""
        }`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden h-16 px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={PLACEHOLDER_IMAGE} alt="뷰티풀한방병원 로고" className="w-8 h-8" />
            <span className="text-lg font-semibold text-[#3E5266]">뷰티풀한방병원</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleCasesClick}
              className="text-sm text-[#3E5266] px-3 py-1.5"
            >
              치료사례
            </button>
            
            {!isAuthenticated ? (
              <button
                onClick={handleLoginClick}
                className="text-sm border border-[#E91E7A] text-[#E91E7A] px-3 py-1.5 rounded-md hover:bg-[#E91E7A]/5"
              >
                로그인
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-[#3E5266]">
                  <User className="w-4 h-4" />
                  <span className="text-xs">{getUserDisplayName()}</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/my-consultations")}>
                    내 상담 내역
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-results")}>
                    내 검사 결과
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-reports")}>
                    치료 경과 리포트
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem 
                      onClick={() => navigate("/admin")}
                      className="text-[#E91E7A] font-medium"
                    >
                      관리자 페이지
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block h-20">
          <div className="max-w-screen-xl mx-auto px-8 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={PLACEHOLDER_IMAGE} alt="뷰티풀한방병원 로고" className="w-10 h-10" />
              <span className="text-2xl font-semibold text-[#3E5266]">뷰티풀한방병원</span>
            </Link>
            
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors">
                홈
              </Link>
              <Link to="/clinics" className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors">
                클리닉
              </Link>
              <Link to="/facilities" className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors">
                치료환경
              </Link>
              <Link to="/columns" className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors">
                치료가이드
              </Link>
              <Link to="/about" className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors">
                병원소개
              </Link>
              <button
                onClick={handleCasesClick}
                className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors"
              >
                치료사례
              </button>
            </nav>
            
            <div className="flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-[#E91E7A] border border-[#E91E7A] px-4 py-2 rounded-md hover:bg-[#E91E7A]/5 transition-colors"
                  >
                    로그인
                  </button>
                  <Link
                    to="/reservation"
                    className="bg-[#E91E7A] text-white px-4 py-2 rounded-md hover:bg-[#D81869] transition-colors"
                  >
                    상담 신청
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 text-[#3E5266] hover:text-[#E91E7A] transition-colors">
                      <User className="w-5 h-5" />
                      <span>{getUserDisplayName()}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem onClick={() => navigate("/my-consultations")}>
                        내 상담 내역
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/my-results")}>
                        내 검사 결과
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/my-reports")}>
                        치료 경과 리포트
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem 
                          onClick={() => navigate("/admin")}
                          className="text-[#E91E7A] font-medium"
                        >
                          관리자 페이지
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to="/reservation"
                    className="bg-[#E91E7A] text-white px-4 py-2 rounded-md hover:bg-[#D81869] transition-colors"
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