/** HandwrittenReviews — 자필 후기 (실제 손편지 사진 8장, 겹쳐 쌓인 연출) */

import { useState } from "react";
import { useNavigate } from "react-router";
import HandwrittenReviewStack from "../common/HandwrittenReviewStack";
import LoginModal from "../../app/components/LoginModal";
import { useAuth } from "../../app/contexts/AuthContext";

const REVIEW_BG_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg";

const CASES_REVIEWS_PATH = "/cases?tab=review";

const BADGES = [
  "치료 효과",
  "식단 만족",
  "친절한 서비스",
  "쾌적한 환경",
];

export default function HandwrittenReviews() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleViewAllReviews = () => {
    if (isAuthenticated) {
      navigate(CASES_REVIEWS_PATH);
      return;
    }
    setShowLoginModal(true);
  };

  return (
    <>
      <section className="py-10 lg:py-16 px-5 lg:px-8 bg-[#F8F3EA]">
        <div className="lg:max-w-6xl lg:mx-auto relative overflow-visible rounded-3xl border border-[#D8CDBE] shadow-sm px-5 py-7 lg:px-10 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:gap-6">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
            <img
              src={REVIEW_BG_IMAGE}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#F8F3EA]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#9A856D]/20 via-[#F8F3EA]/36 to-[#F5EFE6]/26" />
          </div>

          {/* 좌측 텍스트 */}
          <div className="flex-shrink-0 lg:w-[38%] relative z-10">
            <p className="text-sm text-[#FFFFFF] tracking-widest mb-3">
              환자분들의 진심이 증명합니다
            </p>

            <div className="flex flex-row items-center gap-3 lg:gap-5">
              <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/92 backdrop-blur-sm border border-white/55 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 shrink-0">
                <svg className="w-5 h-8 sm:w-7 sm:h-10" viewBox="0 0 28 40" fill="none" aria-hidden="true">
                  <path d="M14 38C8 32 2 24 2 16C2 9 7 4 14 4" stroke="#9A856D" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 20C8 20 6 16 8 12" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M6 28C6 28 3 24 5 20" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>

                <div className="text-center">
                  <h2 className="text-[22px] sm:text-2xl lg:text-3xl font-extrabold text-[#8BC31F] leading-none">
                    자필 후기
                  </h2>
                  <span className="text-[40px] sm:text-4xl lg:text-5xl font-extrabold text-[#8BC31F] leading-none">
                    100+
                  </span>
                </div>

                <svg className="w-5 h-8 sm:w-7 sm:h-10" viewBox="0 0 28 40" fill="none" aria-hidden="true">
                  <path d="M14 38C20 32 26 24 26 16C26 9 21 4 14 4" stroke="#9A856D" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20 20C20 20 22 16 20 12" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M22 28C22 28 25 24 23 20" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="flex flex-col items-start gap-2 min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  {BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] sm:text-xs text-white bg-white/18 border border-white/35 backdrop-blur-sm px-2.5 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleViewAllReviews}
                  className="inline-flex items-center gap-1.5 bg-[#9A856D] text-white text-[12px] sm:text-sm font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#7C654F] transition-colors"
                >
                  전체 후기 보기
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 우측 — 손편지 8장 겹쳐 쌓임 */}
          <div className="relative z-10 flex-1 w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] mt-6 lg:mt-0 flex items-center justify-center">
            <HandwrittenReviewStack className="lg:max-w-none lg:mx-0" />
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        purpose="cases"
        initialMode="signup"
        redirectTo={CASES_REVIEWS_PATH}
      />
    </>
  );
}
