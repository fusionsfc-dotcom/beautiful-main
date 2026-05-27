interface MenuHeaderProps {
  onClose: () => void;
}

export default function MenuHeader({ onClose }: MenuHeaderProps) {
  return (
    <div className="bg-[#FAF6EE] px-4 pt-6 pb-4 border-b border-[#E8DCC8]">
      {/* 로고 + 닫기 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* 골드 나비 아이콘 */}
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 10C16 10 10 4 4 6C2 10 6 16 16 16C6 16 2 22 4 26C10 28 16 22 16 22"
              stroke="#C9A567" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
              stroke="#C9A567" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.5" fill="#C9A567" />
          </svg>
          <div>
            <p className="text-[10px] tracking-widest text-[#C9A567] font-light leading-none">
              Beautiful
            </p>
            <p className="text-[14px] font-bold text-[#3D2817] leading-tight">
              뷰티풀 한방병원
            </p>
          </div>
        </div>

        {/* X 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#E8DCC8] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D2817" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 타이틀 */}
      <div>
        <p className="text-[12px] text-[#8B6F47] mb-0.5">
          암 환자를 위한 통합 재활 병원
        </p>
        <h2 className="text-[20px] font-extrabold text-[#3D2817] leading-tight">
          뷰티풀 한방병원
        </h2>
      </div>
    </div>
  );
}
