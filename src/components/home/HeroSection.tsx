/** HeroSection — 메인 히어로 (좌측 텍스트 + 우측 이미지) */
// TODO: /public/images/redesign/hero-acupuncture.jpg — 한방 시술 받는 여성 사진으로 교체 필요

const HERO_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/hero_img.jpeg";

export default function HeroSection() {
  return (
    <section
      className="relative bg-[#F8F3EA] flex flex-col overflow-hidden lg:min-h-[calc(100dvh-56px)]"
    >
      {/* ── 모바일: 배경 이미지 + 텍스트 오버레이 ── */}
      {/* ── 데스크탑: 좌우 분할 ── */}

      {/* 모바일 전용 배경 이미지 (절대 배치) */}
      <div className="lg:hidden absolute inset-0">
        {/* TODO: 실제 사진 교체 필요 — 한방 시술 받는 여성 클로즈업 (따뜻한 톤) */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* 텍스트 가독성 위한 베이지 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F3EA] via-[#F8F3EA]/80 to-[#F8F3EA]/40" />
      </div>

      {/* 본문 레이아웃 */}
      <div className="relative flex-1 flex flex-col lg:flex-row lg:items-center lg:max-w-6xl lg:mx-auto lg:w-full lg:px-8 lg:gap-12">

        {/* 텍스트 영역 */}
        <div className="flex-1 px-5 pt-6 pb-6 lg:px-0 lg:py-0 relative z-10">
          <p className="text-sm text-[#756A60] tracking-wider mb-3">
            국립암센터 차량 15분 · 파주 뷰티풀 한방병원
          </p>
          <h1 className="text-[36px] lg:text-[52px] font-extrabold leading-tight mb-6">
            <span className="block text-[#2F2A26]">암은 절망이 아닌,</span>
            <span className="block text-[#9A856D]">새로운 시작입니다</span>
          </h1>
          <p className="text-[15px] text-[#756A60] leading-relaxed mb-8 max-w-sm">
            지금 이 순간부터, 몸과 마음의 변화를 통해<br />
            더 나은 삶을 설계해 나가겠습니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="tel:031-945-2000"
              className="inline-flex items-center gap-2 bg-[#9A856D] text-white text-sm font-semibold px-5 py-3 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              전화 상담
            </a>
            <a
              href="/reservation"
              className="inline-flex items-center gap-2 border border-[#9A856D] text-[#6A5542] text-sm font-semibold px-5 py-3 rounded-full bg-white/60 backdrop-blur-sm"
            >
              빠른 예약
            </a>
          </div>

          {/* 신뢰 뱃지 */}
          <div className="flex flex-wrap gap-2">
            {["국립암센터 차량 15분", "호텔형 1인실", "양·한·치과 협진"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs bg-white/70 backdrop-blur-sm text-[#6A5542] px-3 py-1.5 rounded-full font-medium shadow-sm border border-[#D8CDBE]"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </div>

        {/* 데스크탑 전용 우측 이미지 */}
        <div className="hidden lg:block w-[480px] flex-shrink-0 h-[520px] relative">
          {/* TODO: 실제 사진 교체 필요 — 한방 시술 받는 여성 클로즈업 (따뜻한 톤) */}
          <img
            src={HERO_IMAGE}
            alt="한방 치료 받는 환자"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F8F3EA]/20 rounded-2xl" />
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="hidden lg:flex justify-center pb-10 relative z-10">
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9A856D"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="text-[10px] text-[#9A856D] tracking-widest">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
