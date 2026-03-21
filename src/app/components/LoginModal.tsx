import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  purpose?: "cases" | "general";
}

export default function LoginModal({ isOpen, onClose, purpose = "general" }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getMessage = () => {
    if (purpose === "cases") {
      return "치료 사례는 환자 보호를 위해 로그인 후 열람 가능합니다.";
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
        
        // 모달 닫기
        onClose();
        
        // 회원가입 후에는 로그인 모드로 리셋
        setMode('login');
        
        if (purpose === "cases") {
          navigate("/cases");
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#3E5266] mb-2">
              {mode === 'login' ? '로그인' : '회원가입'}
            </h2>
            {purpose === "cases" ? (
              <div className="flex items-start gap-2 text-sm text-[#6B7D8C] bg-[#8FA8BA]/10 p-3 rounded-md mb-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#8FA8BA]" />
                <p>{getMessage()}</p>
              </div>
            ) : null}
            {mode === 'signup' && (
              <div className="bg-gradient-to-r from-[#E91E7A]/5 to-[#8FA8BA]/5 border-l-4 border-[#E91E7A] p-4 rounded-r-md mb-4">
                <p className="text-[#E91E7A] font-semibold text-base mb-1">
                  ✨ 간편하게 3초만에 가입하세요!
                </p>
                <p className="text-sm text-[#6B7D8C]">
                  회원가입 후 <span className="font-medium text-[#3E5266]">실제 치료사례</span>를 확인하실 수 있습니다.
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#3E5266] mb-1">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent bg-white text-[#3E5266]"
                  placeholder="홍길동"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3E5266] mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent bg-white text-[#3E5266]"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3E5266] mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent bg-white text-[#3E5266]"
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
              className="w-full bg-[#E91E7A] text-white py-2.5 rounded-md hover:bg-[#D81869] transition-colors font-medium disabled:opacity-50"
            >
              {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B7D8C]">
              {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{" "}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError("");
                }}
                className="text-[#E91E7A] font-medium hover:underline"
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