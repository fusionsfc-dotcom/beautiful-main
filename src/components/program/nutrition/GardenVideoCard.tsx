/** GardenVideoCard — 텃밭 소개 영상 카드 (클릭 시 YouTube 모달) */
import { useState, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";
import { GARDEN_THUMB_IMAGE, NUTRITION_VIDEO_URL } from "../../../data/nutritionData";

export default function GardenVideoCard() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl overflow-hidden shadow-md relative group text-left focus:outline-none"
        aria-label="텃밭 소개 영상 보기"
      >
        {/* 상단 라벨 */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#6A5542]/80 text-white text-[11px] font-bold px-3 py-1 rounded-full">
            텃밭 소개 영상
          </span>
        </div>

        {/* 썸네일 이미지 */}
        <div className="relative aspect-video">
          {/* TODO: 실제 텃밭 썸네일로 교체 필요 */}
          <img
            src={GARDEN_THUMB_IMAGE}
            alt="텃밭 소개 영상 썸네일"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          {/* 플레이 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#F8F3EA]/90 shadow-lg flex items-center justify-center group-hover:bg-white transition-colors">
              <Play size={20} color="#6A5542" fill="#6A5542" className="translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="bg-[#FFFFFF] px-4 py-3">
          <p className="text-[12px] text-[#9A856D] leading-relaxed">
            건강한 토양이
            <br />
            건강한 식재료를 만듭니다.
          </p>
        </div>
      </button>

      {/* 영상 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="모달 닫기"
              className="absolute -top-10 right-0 text-white hover:text-[#9A856D] transition-colors"
            >
              <X size={28} />
            </button>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              {/* TODO: 실제 유튜브 영상 ID로 교체 — nutritionData.ts의 NUTRITION_VIDEO_URL */}
              <iframe
                src={`${NUTRITION_VIDEO_URL}?autoplay=1`}
                title="텃밭 소개 영상"
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
