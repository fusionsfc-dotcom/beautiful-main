import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  purpose?: "cases" | "general";
  initialMode?: "login" | "signup";
  /** 로그인·가입 성공 후 이동 경로 (purpose=cases 등) */
  redirectTo?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  purpose = "general",
  initialMode = "login",
  redirectTo,
}: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError("");
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const getMessage = () => {
    if (purpose === "cases") {
      return "실제 치료후기·치료사례는 환자 보호를 위해 회원만 열람할 수 있습니다.";
    }
    return "뷰티풀한방병원에 로그인하세요";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    if (mode === 'signup' && !name) {
      setError("이름을 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (mode === 'login') {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        setError(result.error);
      } else {
        // 성공 시 폼 초기화
        setEmail("");
        setPassword("");
        setName("");
        setError("");
        
        onClose();
        onSuccess?.();

        // 회원가입 후에는 로그인 모드로 리셋
        setMode('login');

        if (purpose === "cases") {
          navigate(redirectTo ?? "/cases");
        }
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#756A60] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#6A5542] mb-2">
              {mode === 'login' ? '로그인' : '회원가입'}
            </h2>
            {purpose === "cases" ? (
              <div className="flex items-start gap-2 text-sm text-[#756A60] bg-[#9A856D]/10 p-3 rounded-md mb-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#9A856D]" />
                <p>{getMessage()}</p>
              </div>
            ) : null}
            {purpose === "cases" && (
              <div className="bg-gradient-to-r from-[#8BC31F]/12 to-[#9A856D]/10 border-2 border-[#8BC31F]/40 p-4 rounded-xl mb-4">
                <p className="text-[#6A5542] font-bold text-base mb-1">
                  ⚡ 3초 간편 가입 — 대부분 처음이신 분들도 바로 시작
                </p>
                <p className="text-sm text-[#756A60] leading-relaxed">
                  이메일·이름·비밀번호만 입력하면{" "}
                  <span className="font-semibold text-[#6A5542]">자필 후기·치료사례</span>를 바로 볼 수 있습니다.
                </p>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="mt-3 w-full py-2.5 rounded-lg bg-[#8BC31F] text-white text-sm font-bold hover:bg-[#75A915] transition-colors"
                  >
                    3초 간편 가입하고 후기 보기
                  </button>
                )}
              </div>
            )}
            {mode === "signup" && purpose !== "cases" && (
              <div className="bg-gradient-to-r from-[#6A5542]/5 to-[#9A856D]/5 border-l-4 border-[#9A856D] p-4 rounded-r-md mb-4">
                <p className="text-[#9A856D] font-semibold text-base mb-1">
                  ✨ 간편하게 3초만에 가입하세요!
                </p>
                <p className="text-sm text-[#756A60]">
                  회원가입 후 <span className="font-medium text-[#6A5542]">실제 치료사례</span>를 확인하실 수 있습니다.
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#6A5542] mb-1">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#D8CDBE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent bg-white text-[#6A5542]"
                  placeholder="홍길동"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#6A5542] mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#D8CDBE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent bg-white text-[#6A5542]"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#6A5542] mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#D8CDBE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent bg-white text-[#6A5542]"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9A856D] text-white py-2.5 rounded-md hover:bg-[#7C654F] transition-colors font-medium disabled:opacity-50"
            >
              {loading
                ? "처리 중..."
                : mode === "login"
                  ? "로그인"
                  : purpose === "cases"
                    ? "3초 가입하고 후기 보기"
                    : "회원가입"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#756A60]">
              {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{" "}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError("");
                }}
                className="text-[#9A856D] font-medium hover:underline"
              >
                {mode === 'login' ? '회원가입 (간편하게 3초)' : '로그인'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}