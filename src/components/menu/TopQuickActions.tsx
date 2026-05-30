import { Link, useNavigate } from "react-router";
import { useAuth } from "../../app/contexts/AuthContext";

interface TopQuickActionsProps {
  onOpenAuth: (mode: "login" | "signup") => void;
  onClose: () => void;
}

function getUserDisplayName(user: ReturnType<typeof useAuth>["user"]) {
  if (user?.user_metadata?.name) {
    const name = user.user_metadata.name as string;
    return name.charAt(0) + "O".repeat(Math.max(name.length - 1, 0)) + "님";
  }
  if (user?.email) return user.email.split("@")[0] + "님";
  return "회원님";
}

export default function TopQuickActions({ onOpenAuth, onClose }: TopQuickActionsProps) {
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    onClose();
    navigate("/");
  };

  const linkClass =
    "rounded-xl bg-white border border-[#D8CDBE] px-4 py-4 text-center shadow-sm hover:bg-[#F5EFE6] transition-colors block";

  if (isAuthenticated) {
    return (
      <div className="px-4 py-4 space-y-3">
        <div className="rounded-xl bg-white border border-[#D8CDBE] px-4 py-3 shadow-sm">
          <p className="text-[14px] font-extrabold text-[#6A5542]">
            {getUserDisplayName(user)}
          </p>
          <p className="text-[11px] text-[#756A60] mt-1">
            {isAdmin ? "관리자 계정으로 로그인됨" : "로그인됨"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/my-consultations" onClick={onClose} className={linkClass}>
            <span className="block text-[14px] font-extrabold text-[#6A5542]">
              내 상담 내역
            </span>
            <span className="block text-[11px] text-[#756A60] mt-1">
              상담 기록 확인
            </span>
          </Link>

          <Link to="/my-results" onClick={onClose} className={linkClass}>
            <span className="block text-[14px] font-extrabold text-[#6A5542]">
              내 검사 결과
            </span>
            <span className="block text-[11px] text-[#756A60] mt-1">
              검사 결과 확인
            </span>
          </Link>

          <Link to="/my-reports" onClick={onClose} className={linkClass}>
            <span className="block text-[14px] font-extrabold text-[#6A5542]">
              치료 경과 리포트
            </span>
            <span className="block text-[11px] text-[#756A60] mt-1">
              리포트 확인
            </span>
          </Link>

          {isAdmin ? (
            <Link
              to="/admin"
              onClick={onClose}
              className="rounded-xl bg-[#9A856D] px-4 py-4 text-center shadow-sm hover:bg-[#7C654F] transition-colors block"
            >
              <span className="block text-[14px] font-extrabold text-white">
                관리자 페이지
              </span>
              <span className="block text-[11px] text-white/80 mt-1">
                콘텐츠 관리
              </span>
            </Link>
          ) : (
            <Link to="/cases" onClick={onClose} className={linkClass}>
              <span className="block text-[14px] font-extrabold text-[#6A5542]">
                치료사례
              </span>
              <span className="block text-[11px] text-[#756A60] mt-1">
                사례 열람
              </span>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl border border-[#D8CDBE] px-4 py-3 text-[14px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      <button
        type="button"
        onClick={() => onOpenAuth("login")}
        className="rounded-xl bg-white border border-[#D8CDBE] px-4 py-4 text-center shadow-sm hover:bg-[#F5EFE6] transition-colors"
      >
        <span className="block text-[14px] font-extrabold text-[#6A5542]">
          로그인
        </span>
        <span className="block text-[11px] text-[#756A60] mt-1">
          내 상담 내역 확인
        </span>
      </button>

      <button
        type="button"
        onClick={() => onOpenAuth("signup")}
        className="rounded-xl bg-[#9A856D] px-4 py-4 text-center shadow-sm hover:bg-[#7C654F] transition-colors"
      >
        <span className="block text-[14px] font-extrabold text-white">
          회원가입
        </span>
        <span className="block text-[11px] text-white/80 mt-1">
          3초 간편 가입
        </span>
      </button>
    </div>
  );
}
