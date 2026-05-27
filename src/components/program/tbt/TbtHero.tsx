/** TbtHero — 히어로 섹션 (영상 모달 포함) */
import { useState, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";
import { TBT_HERO_IMAGE, TBT_VIDEO_URL } from "../../../data/tbtData";

export default function TbtHero() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  return (
    <>
      <section className="bg-[#FAF6EE] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

          {/* ── 텍스트 영역 ── */}
          <div className="flex-1">
            {/* 메인 타이틀 */}
            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <h1 className="text-[30px] sm:text-[36px] lg:text-[44px] font-extrabold text-[#3D2817] leading-tight">
                턱관절 균형 요법
              </h1>
              <span className="text-[16px] lg:text-[18px] font-bold text-[#6B5547]">(TBT)</span>
            </div>

            {/* 서브 카피 */}
            <p className="text-[15px] lg:text-[17px] text-[#2A1F18] leading-relaxed mb-6 max-w-md">
              턱관절 균형을 바로잡으면
              <br />
              항암 중 나타나는{" "}
              <span className="font-extrabold" style={{ color: "#8B2A1F" }}>
                다양한 증상
              </span>
              도 함께 좋아집니다
            </p>

            {/* 알약 태그 3개 */}
            <div className="flex items-center gap-2 flex-wrap">
              {["통증 완화", "전신 균형 회복", "면역 안정"].map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="bg-[#F0E6D2] text-[#5B3A1F] text-[12px] font-bold px-4 py-1.5 rounded-full">
                    {tag}
                  </span>
                  {i < 2 && <span className="text-[#C9A567] font-bold text-[14px]">+</span>}
                </span>
              ))}
            </div>
          </div>

          {/* ── 이미지 영역 ── */}
          <div className="w-full lg:w-[480px] lg:flex-shrink-0 relative">
            <div className="relative h-60 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-md">
              {/* TODO: 실제 사진 교체 — /public/images/redesign/tbt/hero.jpg */}
              <img
                src={TBT_HERO_IMAGE}
                alt="턱관절 균형 치료 시술 장면"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* 골격 오버레이 효과 — 반투명 워인 레드 그라데이션 */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(139,42,31,0.18) 0%, transparent 65%)",
                }}
              />
              {/* 빛나는 턱관절 포인트 */}
              <div
                className="absolute top-[38%] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full opacity-70"
                style={{
                  backgroundColor: "#8B2A1F",
                  boxShadow: "0 0 18px 8px rgba(139,42,31,0.45)",
                }}
              />
            </div>

            {/* 플레이 버튼 */}
            <button
              onClick={() => setModalOpen(true)}
              aria-label="TBT 영상 보기"
              className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#FAF6EE]/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
            >
              <Play size={22} color="#3D2817" fill="#3D2817" className="translate-x-0.5" />
            </button>
            {/* TBT 영상 보기 알약 */}
            <div className="absolute bottom-1 right-4 translate-y-full mt-1 pointer-events-none">
              <span className="bg-[#3D2817]/80 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                TBT 영상 보기
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 영상 모달 ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="모달 닫기"
              className="absolute -top-10 right-0 text-white hover:text-[#C9A567] transition-colors"
            >
              <X size={28} />
            </button>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              {/* TODO: 실제 유튜브 영상 ID로 교체 — tbtData.ts의 TBT_VIDEO_URL */}
              <iframe
                src={`${TBT_VIDEO_URL}?autoplay=1`}
                title="TBT 턱관절 균형 요법 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
