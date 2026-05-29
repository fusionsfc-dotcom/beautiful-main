import { useState } from "react";
import LoginModal from "../../app/components/LoginModal";

interface TopQuickActionsProps {
  onClose: () => void;
}

export default function TopQuickActions({ onClose }: TopQuickActionsProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setInitialMode(mode);
    setLoginOpen(true);
    onClose();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <button
          type="button"
          onClick={() => openAuth("login")}
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
          onClick={() => openAuth("signup")}
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

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialMode={initialMode}
      />
    </>
  );
}
